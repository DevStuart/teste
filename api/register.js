import { HttpError, readJson, run, send } from './_lib/http.js';
import { hashPassword, makeRecoveryCode, rateLimit, recoveryHash, setSession, validatePassword, validateUsername } from './_lib/security.js';
import { levelForXp, patentForLevel } from './_lib/progress.js';
import { randomUUID } from 'node:crypto';
import { getDb } from './_lib/db.js';

export default function handler(req, res) {
  return run(req, res, ['POST'], async () => {
    const body = readJson(req);
    const { username, usernameNorm } = validateUsername(body.username);
    validatePassword(body.password);
    if (body.accept !== true) throw new HttpError(400, 'You must accept the terms and privacy policy.');
    await rateLimit(req, 'register', usernameNorm, 5);

    const passwordHash = await hashPassword(body.password);
    const recoveryCode = makeRecoveryCode();
    const accountId = randomUUID();
    try {
      await getDb()`
        INSERT INTO accounts (id, username, username_norm, password_hash, recovery_hash, arsenal)
        VALUES (${accountId}, ${username}, ${usernameNorm}, ${passwordHash}, ${recoveryHash(recoveryCode)}, '{}')
      `;
    } catch (error) {
      if (error?.code === 'ER_DUP_ENTRY') throw new HttpError(409, 'That username is already taken.');
      throw error;
    }
    await setSession(accountId, res);
    const level = levelForXp(0);
    return send(res, 201, {
      user: { username, displayName: username, avatar: null, hasPassword: true, hasRecovery: false },
      level,
      patent: patentForLevel(level.level),
      stats: { kills: 0, deaths: 0, assists: 0, matches: 0, wins: 0, headshots: 0, shots: 0, hits: 0, bestStreak: 0, seconds: 0 },
      recent: [],
      recoveryCode,
    });
  });
}
