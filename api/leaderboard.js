import { HttpError, run, send } from './_lib/http.js';
import { requireAccount } from './_lib/security.js';
import { leaderboard } from './_lib/ranking.js';

export default function handler(req, res) {
  return run(req, res, ['GET'], async () => {
    const account = await requireAccount(req, res), params = req.query || {};
    if (params.scope && params.scope !== 'all') throw new HttpError(400, 'Only the public leaderboard is available.');
    const query = typeof params.q === 'string' ? params.q.trim().slice(0, 32) : '';
    const rawOffset = Number(params.offset || 0);
    if (!Number.isInteger(rawOffset) || rawOffset < 0) throw new HttpError(400, 'Invalid leaderboard offset.');
    const data = await leaderboard(account.id, query, 25, Math.min(rawOffset, 10000));
    return send(res, 200, data);
  });
}
