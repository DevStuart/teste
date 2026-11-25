import { accountData } from './_lib/account.js';
import { run, send } from './_lib/http.js';
import { requireAccount } from './_lib/security.js';

export default function handler(req, res) {
  return run(req, res, ['GET'], async () => {
    const account = await requireAccount(req, res);
    return send(res, 200, await accountData(account.id));
  });
}
