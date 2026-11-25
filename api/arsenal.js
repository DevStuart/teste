import { getDb } from './_lib/db.js';
import { HttpError, readJson, run, send } from './_lib/http.js';
import { requireAccount } from './_lib/security.js';

export default function handler(req, res) {
  return run(req, res, ['GET', 'POST'], async () => {
    const account = await requireAccount(req, res), sql = getDb();
    if (req.method === 'GET') {
      const rows = await sql`SELECT arsenal FROM accounts WHERE id = ${account.id}`;
      return send(res, 200, { data: rows[0]?.arsenal || null });
    }
    const body = readJson(req);
    if (!body.data || typeof body.data !== 'object' || Array.isArray(body.data)) throw new HttpError(400, 'Invalid arsenal data.');
    const data = { ...body.data };
    // Account XP comes only from validated match-end records, never from a client snapshot.
    delete data.px;
    const serialized = JSON.stringify(data);
    if (Buffer.byteLength(serialized) > 512 * 1024) throw new HttpError(413, 'Arsenal data is too large.');
    await sql`UPDATE accounts SET arsenal = ${serialized}, updated_at = now() WHERE id = ${account.id}`;
    return send(res, 200, { ok: true });
  });
}
