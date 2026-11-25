import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import mysql from 'mysql2/promise';

const databaseUrl = process.env.MYSQL_TEST_URL || process.env.DATABASE_URL || process.env.MYSQL_URL;

test('MySQL schema enforces case-insensitive nick uniqueness and cascades user data', { skip: !databaseUrl }, async () => {
  const db = await mysql.createConnection(databaseUrl);
  const accountId = randomUUID();
  const username = `Pilot_${accountId.slice(0, 6)}`;
  const usernameNorm = username.toLowerCase();
  const sessionToken = accountId.replaceAll('-', '').padEnd(64, 'a').slice(0, 64);
  try {
    await db.execute(
      'INSERT INTO accounts (id, username, username_norm, password_hash, recovery_hash, arsenal) VALUES (?, ?, ?, ?, ?, ?)',
      [accountId, username, usernameNorm, 'hash', 'recovery', '{}'],
    );
    await assert.rejects(db.execute(
      'INSERT INTO accounts (id, username, username_norm, password_hash, recovery_hash, arsenal) VALUES (?, ?, ?, ?, ?, ?)',
      [randomUUID(), username.toLowerCase(), usernameNorm, 'hash', 'recovery', '{}'],
    ), (error) => error.code === 'ER_DUP_ENTRY');
    await db.execute(
      'INSERT INTO account_sessions (token_hash, account_id, expires_at) VALUES (?, ?, DATE_ADD(NOW(3), INTERVAL 1 DAY))',
      [sessionToken, accountId],
    );
    await db.execute(`
      INSERT INTO account_matches
        (account_id, map, mode, online, result, duration, kills, deaths, assists, headshots, shots, hits, score, streak, xp)
      VALUES (?, 'map', 'tdm', false, 'win', 60, 1, 1, 0, 0, 2, 1, 10, 1, 100)
    `, [accountId]);

    await db.execute('DELETE FROM accounts WHERE id = ?', [accountId]);
    const [sessions] = await db.execute('SELECT COUNT(*) AS count FROM account_sessions WHERE token_hash = ?', [sessionToken]);
    const [matches] = await db.execute('SELECT COUNT(*) AS count FROM account_matches WHERE account_id = ?', [accountId]);
    assert.equal(Number(sessions[0].count), 0);
    assert.equal(Number(matches[0].count), 0);
  } finally {
    await db.execute('DELETE FROM accounts WHERE id = ?', [accountId]);
    await db.end();
  }
});
