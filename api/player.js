import { getDb } from './_lib/db.js';
import { HttpError, run, send } from './_lib/http.js';
import { requireAccount, validateUsername } from './_lib/security.js';
import { PLAYER_RANK_BY_USERNAME_SQL, publicPlayer } from './_lib/ranking.js';

export default function handler(req, res) {
  return run(req, res, ['GET'], async () => {
    const viewer = await requireAccount(req, res), username = req.query?.u;
    const { usernameNorm } = validateUsername(typeof username === 'string' ? username : '');
    const sql = getDb();
    const [accounts, rank, recent] = await Promise.all([
      sql`
        SELECT id, username, (avatar IS NOT NULL) AS has_avatar, avatar_version, created_at, xp,
          kills, deaths, assists, matches, wins, headshots, shots, hits, best_streak
        FROM accounts WHERE username_norm = ${usernameNorm} LIMIT 1
      `,
      sql.query(PLAYER_RANK_BY_USERNAME_SQL, [usernameNorm]),
      sql`
        SELECT map, mode, result, online, kills, deaths, played_at
        FROM account_matches
        WHERE account_id = (SELECT id FROM accounts WHERE username_norm = ${usernameNorm})
        ORDER BY played_at DESC LIMIT 10
      `,
    ]);
    const row = accounts[0];
    if (!row) throw new HttpError(404, 'Player not found.');
    const self = row.id === viewer.id;
    return send(res, 200, publicPlayer(row, rank[0], recent, self));
  });
}
