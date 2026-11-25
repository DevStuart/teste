import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import mysql from 'mysql2/promise';

const databaseUrl = process.env.MYSQL_TEST_URL || process.env.DATABASE_URL || process.env.MYSQL_URL;
if (databaseUrl && !process.env.DATABASE_URL && !process.env.MYSQL_URL) process.env.DATABASE_URL = databaseUrl;
const { PLAYER_RANK_BY_USERNAME_SQL, RANK_COUNT_SQL, RANKED_PLAYERS_SQL } = await import('../api/_lib/ranking.js');
const { closeDb, getDb } = await import('../api/_lib/db.js');

test('public leaderboard uses permanent XP ranks, stable tie ordering, and literal search', { skip: !databaseUrl }, async () => {
  const db = getDb();
  const connection = await mysql.createConnection(databaseUrl);
  const ids = [randomUUID(), randomUUID(), randomUUID()];
  const names = [`Alpha_${ids[0].slice(0, 5)}`, `Bravo_${ids[1].slice(0, 5)}`, `Search_${ids[2].slice(0, 5)}`];
  try {
    for (let index = 0; index < ids.length; index += 1) {
      await db`
        INSERT INTO accounts (id, username, username_norm, password_hash, recovery_hash, arsenal, xp, created_at)
        VALUES (${ids[index]}, ${names[index]}, ${names[index].toLowerCase()}, 'hash', 'recovery', '{}',
          ${index < 2 ? '9000000000000000000' : '8999999999999999999'}, ${`2025-01-0${index + 1} 00:00:00.000`})
      `;
    }

    const firstPage = await db.query(RANKED_PLAYERS_SQL, ['', '', 2, 0]);
    const rows = firstPage.filter((row) => ids.includes(row.id));
    assert.deepEqual(rows.slice(0, 2).map((row) => [row.username, Number(row.rank)]), [
      [names[0], 1],
      [names[1], 2],
    ]);
    const searchTerm = names[2].slice(0, 6).toLowerCase();
    const search = await db.query(RANKED_PLAYERS_SQL, [searchTerm, searchTerm, 25, 0]);
    assert.deepEqual(search.map((row) => row.username), [names[2]]);
    const countRows = await db.query(RANK_COUNT_SQL, [searchTerm, searchTerm]);
    assert.equal(Number(countRows[0].total), 1);
    const rankRows = await db.query(PLAYER_RANK_BY_USERNAME_SQL, [names[1].toLowerCase()]);
    const [accountCount] = await db`SELECT COUNT(*) AS total FROM accounts`;
    assert.deepEqual(
      { rank: Number(rankRows[0].rank), total: Number(rankRows[0].total) },
      { rank: 2, total: Number(accountCount.total) },
    );
  } finally {
    await connection.execute('DELETE FROM accounts WHERE id IN (?, ?, ?)', ids);
    await connection.end();
    await closeDb();
  }
});
