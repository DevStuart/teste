import { apiMessage } from './i18n.js';

export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export function send(res, status, data, headers = {}) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  for (const [name, value] of Object.entries(headers)) res.setHeader(name, value);
  return res.status(status).json(data);
}

export function method(req, res, allowed) {
  if (allowed.includes(req.method)) return true;
  send(res, 405, { error: apiMessage('Method not allowed.', req.headers['x-lang']) }, { Allow: allowed.join(', ') });
  return false;
}

export function verifySameOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return;
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const protocol = req.headers['x-forwarded-proto'] || (process.env.VERCEL ? 'https' : 'http');
  if (!host || origin !== `${protocol}://${host}`) throw new HttpError(403, 'Request origin is not allowed.');
}

export function readJson(req) {
  let body = req.body;
  if (typeof body === 'string') {
    if (Buffer.byteLength(body) > 1024 * 1024) throw new HttpError(413, 'Request body is too large.');
    try { body = JSON.parse(body); } catch { throw new HttpError(400, 'Invalid JSON body.'); }
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw new HttpError(400, 'A JSON object is required.');
  if (Buffer.byteLength(JSON.stringify(body)) > 1024 * 1024) throw new HttpError(413, 'Request body is too large.');
  return body;
}

export function handleError(req, res, error) {
  if (error instanceof HttpError) return send(res, error.status, { error: apiMessage(error.message, req.headers['x-lang']) });
  console.error('Account API error:', error);
  return send(res, 500, { error: apiMessage('The request could not be completed. Please try again.', req.headers['x-lang']) });
}

export async function run(req, res, allowed, action) {
  if (!method(req, res, allowed)) return;
  try {
    if (req.method === 'POST') {
      verifySameOrigin(req);
      if (!String(req.headers['content-type'] || '').toLowerCase().startsWith('application/json')) {
        throw new HttpError(415, 'Content-Type must be application/json.');
      }
    }
    await action();
  } catch (error) {
    handleError(req, res, error);
  }
}
