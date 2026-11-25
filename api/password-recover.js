import { getDb } from './_lib/db.js';
import { accountData } from './_lib/account.js';
import { HttpError, readJson, run, send } from './_lib/http.js';
import { hashPassword, makeRecoveryCode, rateLimit, recoveryHash, setSession, validatePassword, validateUsername } from './_lib/security.js';

export default function handler(req, res) {
  return run(req, res, ['POST'], async () => {
    const body = readJson(req);
    const { usernameNorm } = validateUsername(body.username);
    validatePassword(body.password);
    if (typeof body.code !== 'string' || body.code.length > 64) throw new HttpError(401, 'Username or recovery code is incorrect.');
    await rateLimit(req, 'recover', usernameNorm, 6);
    const sql = getDb(), oldHash = recoveryHash(body.code);
    const rows = await sql`
      SELECT id FROM accounts
      WHERE username_norm = ${usernameNorm} AND recovery_hash = ${oldHash} AND recovery_confirmed = true
      LIMIT 1
    `;
    if (!rows[0]) throw new HttpError(401, 'Username or recovery code is incorrect.');

    const recoveryCode = makeRecoveryCode(), passwordHash = await hashPassword(body.password);
    await sql`
      UPDATE accounts SET password_hash = ${passwordHash}, recovery_hash = ${recoveryHash(recoveryCode)},
        recovery_confirmed = false, updated_at = now()
      WHERE id = ${rows[0].id}
    `;
    await sql`DELETE FROM account_sessions WHERE account_id = ${rows[0].id}`;
    await setSession(rows[0].id, res);
    return send(res, 200, { ...(await accountData(rows[0].id)), recoveryCode });
  });
}
