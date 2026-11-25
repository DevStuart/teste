import { getDb } from './_lib/db.js';
import { accountData } from './_lib/account.js';
import { HttpError, readJson, run, send } from './_lib/http.js';
import { hashPassword, makeRecoveryCode, rateLimit, recoveryHash, setSession, validatePassword, validateUsername, verifyPassword } from './_lib/security.js';

export default function handler(req, res) {
  return run(req, res, ['POST'], async () => {
    const body = readJson(req);
    const login = body.login;
    if (typeof login !== 'string' || typeof body.password !== 'string' || body.password.length > 128) {
      throw new HttpError(400, 'Enter a username and password.');
    }
    const { usernameNorm } = validateUsername(login);
    await rateLimit(req, 'login', usernameNorm);
    const sql = getDb();
    const rows = await sql`
      SELECT id, password_hash, recovery_confirmed FROM accounts WHERE username_norm = ${usernameNorm} LIMIT 1
    `;
    const account = rows[0];
    const valid = account ? await verifyPassword(body.password, account.password_hash) : (await hashPassword(body.password), false);
    if (!valid) throw new HttpError(401, 'Username or password is incorrect.');

    let recoveryCode;
    if (!account.recovery_confirmed) {
      recoveryCode = makeRecoveryCode();
      await sql`
        UPDATE accounts SET recovery_hash = ${recoveryHash(recoveryCode)}, updated_at = now()
        WHERE id = ${account.id}
      `;
    }
    await setSession(account.id, res);
    const data = await accountData(account.id);
    return send(res, 200, { ...data, ...(recoveryCode ? { recoveryCode } : {}) });
  });
}
