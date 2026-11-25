import { getDb } from './_lib/db.js';
import { HttpError, readJson, run, send } from './_lib/http.js';
import { clearSessionCookie, rateLimit, requireAccount, verifyPassword } from './_lib/security.js';

export default function handler(req, res) {
  return run(req, res, ['POST'], async () => {
    const account = await requireAccount(req, res), body = readJson(req);
    await rateLimit(req, 'account-delete', account.id, 3);
    if (typeof body.confirm !== 'string' || body.confirm.toLowerCase() !== account.username.toLowerCase()) {
      throw new HttpError(400, 'Type your username to confirm account deletion.');
    }
    const sql = getDb(), rows = await sql`SELECT password_hash FROM accounts WHERE id = ${account.id}`;
    if (!rows[0] || !(await verifyPassword(String(body.password || ''), rows[0].password_hash))) {
      throw new HttpError(401, 'Password is incorrect.');
    }
    await sql`DELETE FROM accounts WHERE id = ${account.id}`;
    clearSessionCookie(res);
    return send(res, 200, { ok: true });
  });
}
