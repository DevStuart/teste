import { getDb } from './_lib/db.js';
import { accountData } from './_lib/account.js';
import { HttpError, readJson, run, send } from './_lib/http.js';
import { requireAccount, recoveryHash } from './_lib/security.js';

export default function handler(req, res) {
  return run(req, res, ['POST'], async () => {
    const account = await requireAccount(req, res), body = readJson(req);
    if (typeof body.code !== 'string' || body.code.length > 64) throw new HttpError(400, 'Invalid recovery code.');
    const result = await getDb()`
      UPDATE accounts SET recovery_confirmed = true, updated_at = now()
      WHERE id = ${account.id} AND recovery_hash = ${recoveryHash(body.code)}
    `;
    if (!result.affectedRows) throw new HttpError(422, 'That recovery code is no longer valid. Request a new one.');
    return send(res, 200, await accountData(account.id));
  });
}
