import { createHash, randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import { getDb } from './db.js';
import { HttpError } from './http.js';

const scrypt = promisify(scryptCallback);
const SESSION_DAYS = 30;
const SESSION_SECONDS = SESSION_DAYS * 24 * 60 * 60;

export const sha256 = (value) => createHash('sha256').update(value).digest('hex');
export const makeRecoveryCode = () => randomBytes(20).toString('hex').toUpperCase();
export const recoveryHash = (code) => sha256(String(code).replace(/[\s-]/g, '').toUpperCase());

export function sessionCookieName() {
  return process.env.VERCEL ? '__Host-riposte_session' : 'riposte_session';
}

function cookieHeader(value, maxAge) {
  const secure = process.env.VERCEL ? '; Secure' : '';
  return `${sessionCookieName()}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure}`;
}

export function clearSessionCookie(res) {
  res.setHeader('Set-Cookie', cookieHeader('', 0));
}

export async function setSession(accountId, res) {
  const token = randomBytes(32).toString('hex');
  const sql = getDb();
  await sql`
    INSERT INTO account_sessions (token_hash, account_id, expires_at)
    VALUES (${sha256(token)}, ${accountId}, DATE_ADD(now(3), INTERVAL ${SESSION_SECONDS} SECOND))
  `;
  res.setHeader('Set-Cookie', cookieHeader(token, SESSION_SECONDS));
}

function requestCookie(req) {
  const wanted = `${sessionCookieName()}=`;
  for (const part of String(req.headers.cookie || '').split(';')) {
    const item = part.trim();
    if (item.startsWith(wanted)) return item.slice(wanted.length);
  }
  return '';
}

export async function requireAccount(req, res) {
  const token = requestCookie(req);
  if (!/^[a-f0-9]{64}$/.test(token)) throw new HttpError(401, 'Please sign in again.');
  const sql = getDb();
  const rows = await sql`
    SELECT a.id, a.username, a.avatar_version, a.recovery_confirmed, s.token_hash
    FROM account_sessions s
    JOIN accounts a ON a.id = s.account_id
    WHERE s.token_hash = ${sha256(token)} AND s.expires_at > now()
    LIMIT 1
  `;
  const account = rows[0];
  if (!account) throw new HttpError(401, 'Please sign in again.');
  await sql`
    UPDATE account_sessions
    SET last_seen_at = now(3), expires_at = DATE_ADD(now(3), INTERVAL ${SESSION_SECONDS} SECOND)
    WHERE token_hash = ${account.token_hash}
  `;
  res.setHeader('Set-Cookie', cookieHeader(token, SESSION_SECONDS));
  return account;
}

export async function hashPassword(password) {
  const salt = randomBytes(16);
  const derived = await scrypt(password, salt, 64, { N: 16384, r: 8, p: 1, maxmem: 128 * 1024 * 1024 });
  return `scrypt$16384$8$1$${salt.toString('hex')}$${derived.toString('hex')}`;
}

export async function verifyPassword(password, encoded) {
  if (typeof password !== 'string' || password.length > 128) return false;
  const parts = String(encoded || '').split('$');
  if (parts.length !== 6 || parts[0] !== 'scrypt' || parts[1] !== '16384' || parts[2] !== '8' || parts[3] !== '1') return false;
  if (!/^[a-f0-9]{32}$/.test(parts[4]) || !/^[a-f0-9]{128}$/.test(parts[5])) return false;
  const expected = Buffer.from(parts[5], 'hex');
  const actual = await scrypt(password, Buffer.from(parts[4], 'hex'), expected.length, { N: 16384, r: 8, p: 1, maxmem: 128 * 1024 * 1024 });
  return timingSafeEqual(expected, actual);
}

export function validatePassword(password) {
  if (typeof password !== 'string' || password.length < 8 || password.length > 128) {
    throw new HttpError(400, 'Password must be between 8 and 128 characters.');
  }
}

export function validateUsername(username) {
  if (typeof username !== 'string' || !/^[A-Za-z0-9_]{3,16}$/.test(username)) {
    throw new HttpError(400, 'Username must be 3 to 16 letters, numbers, or underscores.');
  }
  return { username, usernameNorm: username.toLowerCase() };
}

export async function rateLimit(req, action, identifier, maxAttempts = 12) {
  const forwarded = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  const ip = forwarded || String(req.socket?.remoteAddress || 'unknown');
  const bucket = sha256(`${action}\0${ip}\0${String(identifier).toLowerCase()}`).slice(0, 64);
  const sql = getDb();
  await sql`DELETE FROM auth_rate_limits WHERE expires_at < now()`;
  await sql`
    INSERT INTO auth_rate_limits (bucket, attempts, expires_at)
    VALUES (${bucket}, 1, DATE_ADD(now(3), INTERVAL 15 MINUTE))
    ON DUPLICATE KEY UPDATE
      attempts = IF(auth_rate_limits.expires_at <= now(3), 1, auth_rate_limits.attempts + 1),
      expires_at = IF(auth_rate_limits.expires_at <= now(3), DATE_ADD(now(3), INTERVAL 15 MINUTE), auth_rate_limits.expires_at)
  `;
  const rows = await sql`SELECT attempts FROM auth_rate_limits WHERE bucket = ${bucket}`;
  if (Number(rows[0]?.attempts) > maxAttempts) throw new HttpError(429, 'Too many attempts. Please wait and try again.');
}

export function currentSessionHash(req) {
  const token = requestCookie(req);
  return /^[a-f0-9]{64}$/.test(token) ? sha256(token) : '';
}
