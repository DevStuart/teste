import { getDb } from './_lib/db.js';
import { run, send } from './_lib/http.js';
import { requireAccount } from './_lib/security.js';

export default function handler(req, res) {
  return run(req, res, ['GET'], async () => {
    const viewer = await requireAccount(req, res), username = req.query?.u;
    const rows = username
      ? await getDb()`SELECT avatar, avatar_type FROM accounts WHERE username_norm = ${String(username).toLowerCase()} LIMIT 1`
      : await getDb()`SELECT avatar, avatar_type FROM accounts WHERE id = ${viewer.id} LIMIT 1`;
    const image = rows[0];
    if (!image?.avatar || !image.avatar_type) return send(res, 404, { error: 'No avatar is set.' });
    res.setHeader('Cache-Control', 'private, max-age=300');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Content-Type', image.avatar_type);
    return res.status(200).send(Buffer.from(image.avatar));
  });
}
