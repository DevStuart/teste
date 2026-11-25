import { getDb } from './_lib/db.js';
import { accountData } from './_lib/account.js';
import { HttpError, readJson, run, send } from './_lib/http.js';
import { hashPassword, makeRecoveryCode, rateLimit, recoveryHash, requireAccount, currentSessionHash, validatePassword, verifyPassword } from './_lib/security.js';

export default function handler(req, res) {
  return run(req, res, ['POST'], async () => {
    const account = await requireAccount(req, res), body = readJson(req);
    await rateLimit(req, 'password-change', account.id, 5);
    validatePassword(body.next);
    const sql = getDb(), rows = await sql`SELECT password_hash FROM accounts WHERE id = ${account.id}`;
    if (!rows[0] || !(await verifyPassword(body.current, rows[0].password_hash))) {
      throw new HttpError(401, 'Current password is incorrect.');
    }
    const recoveryCode = makeRecoveryCode();
    await sql`
      UPDATE accounts SET password_hash = ${await hashPassword(body.next)}, recovery_hash = ${recoveryHash(recoveryCode)},
        recovery_confirmed = false, updated_at = now()
      WHERE id = ${account.id}
    `;
    const sessionHash = currentSessionHash(req);
    await sql`DELETE FROM account_sessions WHERE account_id = ${account.id} AND token_hash <> ${sessionHash}`;
    return send(res, 200, { ...(await accountData(account.id)), recoveryCode });
  });
}
