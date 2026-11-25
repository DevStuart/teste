import { readFile } from 'node:fs/promises';
import mysql from 'mysql2/promise';
import { LOCAL_DATABASE_URL } from '../api/_lib/db.js';

const url = process.env.DATABASE_URL || process.env.MYSQL_URL || LOCAL_DATABASE_URL;
const schema = await readFile(new URL('../api/schema.sql', import.meta.url), 'utf8');
const connection = await mysql.createConnection(url);
try {
  for (const statement of schema.split(';').map((item) => item.trim()).filter(Boolean)) {
    await connection.query(statement);
  }
  console.log('MySQL account schema is up to date.');
} finally {
  await connection.end();
}
