import mysql from 'mysql2/promise';

export const LOCAL_DATABASE_URL = 'mysql://riposte_local:riposte_local_dev_only@127.0.0.1:3307/riposte_frontline';

let pool;

function createQuery(connection) {
  const query = async (statement, values = []) => {
    const [rows] = await connection.execute(statement, values);
    return rows;
  };
  const tagged = (parts, ...values) => {
    const statement = parts.reduce((text, part, index) => (
    text + part + (index < values.length ? '?' : '')
    ), '');
    return query(statement, values);
  };
  tagged.query = query;
  tagged.getConnection = () => connection.getConnection();
  return tagged;
}

export function getDb() {
  const url = process.env.DATABASE_URL || process.env.MYSQL_URL;
  if (!url) throw new Error('DATABASE_URL is not configured.');
  if (!pool) pool = mysql.createPool(url);
  return createQuery(pool);
}

export async function withTransaction(action) {
  const connection = await getDb().getConnection();
  try {
    await connection.beginTransaction();
    const result = await action(createQuery(connection));
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function closeDb() {
  if (!pool) return;
  const activePool = pool;
  pool = undefined;
  await activePool.end();
}
