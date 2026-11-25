import { getDb } from './_lib/db.js';
import { HttpError, readJson, run } from './_lib/http.js';
import { requireAccount } from './_lib/security.js';

export default function handler(req, res) {
  return run(req, res, ['POST'], async () => {
    readJson(req);
    const account = await requireAccount(req, res), sql = getDb();
    const [accounts, matches] = await Promise.all([
      sql`
        SELECT username, avatar, avatar_type, xp, kills, deaths, assists, matches, wins, headshots, shots, hits,
          best_streak, seconds, arsenal, terms_accepted_at, created_at, updated_at
        FROM accounts WHERE id = ${account.id}
      `,
      sql`SELECT map, mode, online, result, duration, kills, deaths, assists, headshots, shots, hits, score, streak, xp, played_at
        FROM account_matches WHERE account_id = ${account.id} ORDER BY played_at DESC`,
    ]);
    if (!accounts[0]) throw new HttpError(404, 'Account not found.');
    const row = accounts[0];
    const exportData = {
      account: {
        username: row.username,
        avatar: row.avatar ? `data:${row.avatar_type};base64,${Buffer.from(row.avatar).toString('base64')}` : null,
        xp: Number(row.xp),
        stats: Object.fromEntries(['kills', 'deaths', 'assists', 'matches', 'wins', 'headshots', 'shots', 'hits', 'best_streak', 'seconds'].map((key) => [key, Number(row[key])])),
        arsenal: row.arsenal,
        termsAcceptedAt: row.terms_accepted_at,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      },
      matches,
      exportedAt: new Date().toISOString(),
    };
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="riposte-frontline-mes-donnees.json"');
    return res.status(200).send(JSON.stringify(exportData, null, 2));
  });
}
