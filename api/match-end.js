import { withTransaction } from './_lib/db.js';
import { HttpError, readJson, run, send } from './_lib/http.js';
import { accountData, integer } from './_lib/account.js';
import { requireAccount, sha256 } from './_lib/security.js';
import { levelForXp, patentForLevel } from './_lib/progress.js';

const RESULTS = new Set(['win', 'loss', 'draw', 'quit']);

export async function recordMatch(params) {
  const [tokenHash, accountId, requestedDuration, ...stats] = params;
  const [killsInput, deathsInput, assistsInput, headshotsInput, headshotKillsInput,
    shotsInput, hitsInput, shotLimitInput, scoreInput, streakInput, streakKillsInput, result] = stats;

  return withTransaction(async (sql) => {
    const tickets = await sql`
      SELECT map, mode, online,
        GREATEST(0, TIMESTAMPDIFF(SECOND, started_at, NOW(3))) AS elapsed
      FROM match_tickets
      WHERE token_hash = ${tokenHash} AND account_id = ${accountId}
        AND consumed_at IS NULL AND started_at > DATE_SUB(NOW(3), INTERVAL 90 MINUTE)
      FOR UPDATE
    `;
    const ticket = tickets[0];
    if (!ticket) return null;

    const duration = Math.min(3600, requestedDuration, Number(ticket.elapsed));
    const kills = Math.min(killsInput, Math.floor(duration / 3));
    const deaths = Math.min(deathsInput, Math.floor(duration / 2));
    const assists = Math.min(assistsInput, Math.floor(duration / 5));
    const headshots = Math.min(headshotsInput, Math.floor(duration / 3), headshotKillsInput);
    const shots = Math.min(shotsInput, duration * 5);
    const hits = Math.min(hitsInput, duration * 5, shotLimitInput);
    const score = scoreInput;
    const streak = Math.min(streakInput, Math.floor(duration / 3), streakKillsInput);
    const gained = duration < 30 ? 0 : Math.min(2500, Math.round(
      (ticket.online ? 1 : 0.5) *
      (kills * 50 + headshots * 15 + assists * 20 + Math.floor(duration / 60) * 20 + 100 +
        (result === 'win' ? 150 : result === 'draw' ? 50 : 0)),
    ));

    await sql`UPDATE match_tickets SET consumed_at = NOW(3) WHERE token_hash = ${tokenHash}`;

    const previousRows = await sql`SELECT xp FROM accounts WHERE id = ${accountId} FOR UPDATE`;
    if (!previousRows[0]) throw new Error('Match ticket belongs to a missing account.');
    const previousXp = Number(previousRows[0].xp);
    await sql`
      UPDATE accounts SET
        xp = xp + ${gained},
        kills = kills + ${kills},
        deaths = deaths + ${deaths},
        assists = assists + ${assists},
        matches = matches + 1,
        wins = wins + ${result === 'win' ? 1 : 0},
        headshots = headshots + ${headshots},
        shots = shots + ${shots},
        hits = hits + ${hits},
        best_streak = GREATEST(best_streak, ${streak}),
        seconds = seconds + ${duration},
        updated_at = NOW(3)
      WHERE id = ${accountId}
    `;
    const totalRows = await sql`SELECT xp FROM accounts WHERE id = ${accountId}`;
    const totalXp = Number(totalRows[0].xp);
    await sql`
      INSERT INTO account_matches
        (account_id, map, mode, online, result, duration, kills, deaths, assists, headshots, shots, hits, score, streak, xp)
      VALUES
        (${accountId}, ${ticket.map}, ${ticket.mode}, ${ticket.online}, ${result}, ${duration},
          ${kills}, ${deaths}, ${assists}, ${headshots}, ${shots}, ${hits}, ${score}, ${streak}, ${gained})
    `;

    return {
      gained,
      duration,
      kills,
      deaths,
      assists,
      headshots,
      shots,
      hits,
      score,
      streak,
      total_xp: totalXp,
      previous_xp: previousXp,
    };
  });
}

export default function handler(req, res) {
  return run(req, res, ['POST'], async () => {
    const account = await requireAccount(req, res), body = readJson(req), summary = body.summary;
    if (typeof body.token !== 'string' || !/^[a-f0-9]{64}$/.test(body.token)) throw new HttpError(400, 'Invalid match token.');
    if (!summary || typeof summary !== 'object' || Array.isArray(summary) || !RESULTS.has(summary.result)) {
      throw new HttpError(400, 'Invalid match summary.');
    }
    const params = [
      sha256(body.token), account.id,
      integer(summary.duration, 3600),
      integer(summary.kills), integer(summary.deaths), integer(summary.assists),
      integer(summary.headshots), integer(summary.kills),
      integer(summary.shots), integer(summary.hits), integer(summary.shots),
      integer(summary.score, 1000000), integer(summary.streak), integer(summary.kills),
      summary.result,
    ];
    const entry = await recordMatch(params);
    if (!entry) throw new HttpError(422, 'This match could not be recorded. It may have expired or already been submitted.');
    const level = levelForXp(entry.total_xp), previousLevel = levelForXp(entry.previous_xp);
    const data = await accountData(account.id);
    return send(res, 200, {
      ...data,
      gained: Number(entry.gained),
      levelUp: level.level > previousLevel.level,
      patent: patentForLevel(level.level),
    });
  });
}
