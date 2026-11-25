import { getDb } from './_lib/db.js';
import { run, send } from './_lib/http.js';
import { clearSessionCookie, currentSessionHash } from './_lib/security.js';

export default function handler(req, res) {
  return run(req, res, ['POST'], async () => {
    const tokenHash = currentSessionHash(req);
    clearSessionCookie(res);
    if (tokenHash) await getDb()`DELETE FROM account_sessions WHERE token_hash = ${tokenHash}`;
    return send(res, 200, { ok: true });
  });
}
