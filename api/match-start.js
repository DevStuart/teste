import { getDb } from './_lib/db.js';
import { HttpError, readJson, run, send } from './_lib/http.js';
import { rateLimit, requireAccount, sha256 } from './_lib/security.js';
import { randomBytes } from 'node:crypto';

function safeId(value, label) {
  if (typeof value !== 'string' || !/^[a-zA-Z0-9_-]{1,32}$/.test(value)) {
    throw new HttpError(400, label === 'map' ? 'Invalid map.' : 'Invalid mode.');
  }
  return value;
}

export default function handler(req, res) {
  return run(req, res, ['POST'], async () => {
    const account = await requireAccount(req, res), body = readJson(req);
    if (typeof body.online !== 'boolean') throw new HttpError(400, 'Match type is required.');
    await rateLimit(req, 'match-start', account.id, 30);
    const map = safeId(body.map, 'map'), mode = safeId(body.mode, 'mode');
    const token = randomBytes(32).toString('hex'), sql = getDb();
    await sql`
      INSERT INTO match_tickets (token_hash, account_id, map, mode, online)
      VALUES (${sha256(token)}, ${account.id}, ${map}, ${mode}, ${body.online})
    `;
    return send(res, 201, { token });
  });
}
