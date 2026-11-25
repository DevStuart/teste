import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import mysql from 'mysql2/promise';

const databaseUrl = process.env.MYSQL_TEST_URL || process.env.DATABASE_URL || process.env.MYSQL_URL;
if (databaseUrl && !process.env.DATABASE_URL && !process.env.MYSQL_URL) process.env.DATABASE_URL = databaseUrl;
const { recordMatch } = await import('../api/match-end.js');
const { closeDb, getDb } = await import('../api/_lib/db.js');

test('match-end consumes one server ticket and persists its bounded server reward atomically', { skip: !databaseUrl }, async () => {
  const accountId = randomUUID();
  const tokenHash = 'a'.repeat(64);
  const db = getDb();
  const username = `Pilot_${accountId.slice(0, 6)}`;
  try {
    await db`
      INSERT INTO accounts (id, username, username_norm, password_hash, recovery_hash, arsenal)
      VALUES (${accountId}, ${username}, ${username.toLowerCase()}, 'hash', 'recovery', '{}')
    `;
    await db`
      INSERT INTO match_tickets (token_hash, account_id, map, mode, online, started_at)
      VALUES (${tokenHash}, ${accountId}, 'dust', 'tdm', false, DATE_SUB(NOW(3), INTERVAL 120 SECOND))
    `;
    const params = [tokenHash, accountId, 3600, 100, 100, 20, 100, 100, 100, 100, 1000, 1000, 100, 100, 'win'];

    const result = await recordMatch(params);
    assert.ok(result);
    assert.ok(result.duration >= 119 && result.duration <= 120);
    assert.equal(result.kills, 40);
    assert.equal(result.deaths, 60);
    assert.equal(result.assists, 20);
    assert.equal(result.headshots, 40);
    assert.equal(result.shots, 100);
    assert.equal(result.hits, 100);
    assert.equal(result.gained, 1645);
    assert.equal(result.total_xp, 1645);

    const [summary] = await db`SELECT matches, wins, xp FROM accounts WHERE id = ${accountId}`;
    const [history] = await db`SELECT COUNT(*) AS count FROM account_matches WHERE account_id = ${accountId}`;
    assert.equal(Number(summary.matches), 1);
    assert.equal(Number(summary.wins), 1);
    assert.equal(Number(summary.xp), 1645);
    assert.equal(Number(history.count), 1);
    assert.equal(await recordMatch(params), null);
  } finally {
    await db`DELETE FROM accounts WHERE id = ${accountId}`;
    await closeDb();
  }
});
