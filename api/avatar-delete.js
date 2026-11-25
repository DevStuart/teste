import { getDb } from './_lib/db.js';
import { accountData } from './_lib/account.js';
import { readJson, run, send } from './_lib/http.js';
import { requireAccount } from './_lib/security.js';

export default function handler(req, res) {
  return run(req, res, ['POST'], async () => {
    readJson(req);
    const account = await requireAccount(req, res);
    await getDb()`
      UPDATE accounts SET avatar = NULL, avatar_type = NULL, avatar_version = avatar_version + 1, updated_at = now()
      WHERE id = ${account.id}
    `;
    return send(res, 200, await accountData(account.id));
  });
}
