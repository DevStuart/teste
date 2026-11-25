import { getDb } from './_lib/db.js';
import { accountData } from './_lib/account.js';
import { HttpError, readJson, run, send } from './_lib/http.js';
import { makeRecoveryCode, rateLimit, recoveryHash, requireAccount, verifyPassword } from './_lib/security.js';

export default function handler(req, res) {
  return run(req, res, ['POST'], async () => {
    const account = await requireAccount(req, res), body = readJson(req), sql = getDb();
    await rateLimit(req, 'recovery-new', account.id, 5);
    const rows = await sql`SELECT password_hash FROM accounts WHERE id = ${account.id}`;
    if (!rows[0] || !(await verifyPassword(String(body.password || ''), rows[0].password_hash))) {
      throw new HttpError(401, 'Password is incorrect.');
    }
    const recoveryCode = makeRecoveryCode();
    await sql`
      UPDATE accounts SET recovery_hash = ${recoveryHash(recoveryCode)}, recovery_confirmed = false, updated_at = now()
      WHERE id = ${account.id}
    `;
    return send(res, 200, { ...(await accountData(account.id)), recoveryCode });
  });
}
