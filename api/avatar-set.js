import { getDb } from './_lib/db.js';
import { accountData } from './_lib/account.js';
import { HttpError, readJson, run, send } from './_lib/http.js';
import { requireAccount } from './_lib/security.js';

function parseImage(value) {
  if (typeof value !== 'string' || value.length > 700000) throw new HttpError(413, 'Avatar image is too large.');
  const match = /^data:(image\/(?:jpeg|webp|png));base64,([A-Za-z0-9+/]+={0,2})$/.exec(value);
  if (!match) throw new HttpError(400, 'Avatar must be a JPEG, WebP, or PNG image.');
  const bytes = Buffer.from(match[2], 'base64');
  if (!bytes.length || bytes.length > 512 * 1024) throw new HttpError(413, 'Avatar image is too large.');
  const valid = match[1] === 'image/jpeg'
    ? bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff
    : match[1] === 'image/png'
      ? bytes.length >= 8 && bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
      : bytes.length >= 12 && bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP';
  if (!valid) throw new HttpError(400, 'The image data is invalid.');
  return { type: match[1], base64: bytes.toString('base64') };
}

export default function handler(req, res) {
  return run(req, res, ['POST'], async () => {
    const account = await requireAccount(req, res), body = readJson(req), image = parseImage(body.image), sql = getDb();
    await sql`
      UPDATE accounts SET avatar = FROM_BASE64(${image.base64}), avatar_type = ${image.type},
        avatar_version = avatar_version + 1, updated_at = now()
      WHERE id = ${account.id}
    `;
    return send(res, 200, await accountData(account.id));
  });
}
