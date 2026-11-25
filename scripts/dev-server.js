import { createReadStream } from 'node:fs';
import { access, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, resolve, sep } from 'node:path';
import { pathToFileURL } from 'node:url';
import { closeDb, LOCAL_DATABASE_URL } from '../api/_lib/db.js';

const root = resolve('dist');
const apiRoot = resolve('api');
const port = Number(process.env.PORT || 8000);
const host = process.env.HOST || '127.0.0.1';

if (!process.env.DATABASE_URL && !process.env.MYSQL_URL) {
  process.env.DATABASE_URL = LOCAL_DATABASE_URL;
}

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mp3': 'audio/mpeg',
  '.ogg': 'audio/ogg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.wasm': 'application/wasm',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
};

function createResponse(res) {
  return {
    setHeader(name, value) {
      res.setHeader(name, value);
    },
    status(code) {
      res.statusCode = code;
      return this;
    },
    json(data) {
      if (!res.hasHeader('Content-Type')) res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify(data));
      return this;
    },
    send(data) {
      res.end(data);
      return this;
    },
  };
}

async function readBody(req) {
  const chunks = [];
  let length = 0;
  for await (const chunk of req) {
    length += chunk.length;
    if (length > 1024 * 1024) throw Object.assign(new Error('Request body is too large.'), { status: 413 });
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}

async function handleApi(req, res, pathname, url) {
  const name = pathname.slice('/api/'.length).replace(/\.js$/, '');
  if (!/^[a-z0-9-]+$/i.test(name)) return false;
  let handler;
  try {
    const path = resolve(apiRoot, `${name}.js`);
    if (!path.startsWith(`${apiRoot}${sep}`)) return false;
    await access(path);
    ({ default: handler } = await import(pathToFileURL(path).href));
  } catch (error) {
    if (error?.code === 'ENOENT') return false;
    throw error;
  }
  const query = Object.fromEntries(url.searchParams.entries());
  req.query = query;
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
    req.body = await readBody(req);
  }
  await handler(req, createResponse(res));
  return true;
}

async function handleStatic(req, res, pathname) {
  const relative = pathname === '/' ? 'riposte-frontline.html' : decodeURIComponent(pathname).replace(/^[/\\]+/, '');
  const path = resolve(root, relative);
  if (path !== root && !path.startsWith(`${root}${sep}`)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  try {
    const info = await stat(path);
    if (!info.isFile()) throw Object.assign(new Error('Not found'), { code: 'ENOENT' });
    res.setHeader('Content-Type', contentTypes[extname(path).toLowerCase()] || 'application/octet-stream');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.writeHead(200);
    if (req.method === 'HEAD') res.end();
    else createReadStream(path).pipe(res);
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error;
    res.writeHead(404);
    res.end('Not found');
  }
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    if (url.pathname.startsWith('/api/')) {
      if (!(await handleApi(req, res, url.pathname, url))) {
        res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: 'API endpoint not found.' }));
      }
      return;
    }
    if (!['GET', 'HEAD'].includes(req.method)) {
      res.writeHead(405, { Allow: 'GET, HEAD' });
      res.end('Method not allowed');
      return;
    }
    await handleStatic(req, res, url.pathname);
  } catch (error) {
    console.error('Local development server error:', error);
    if (!res.headersSent) res.writeHead(error.status || 500, { 'Content-Type': 'application/json; charset=utf-8' });
    if (!res.writableEnded) res.end(JSON.stringify({ error: error.status === 413 ? error.message : 'Local server error.' }));
  }
});

server.listen(port, host, () => {
  console.log(`Riposte: Frontline local server: http://${host}:${port}/riposte-frontline.html`);
  console.log('MySQL connection configured.');
});

async function shutdown() {
  server.close();
  await closeDb();
}

process.once('SIGINT', shutdown);
process.once('SIGTERM', shutdown);
