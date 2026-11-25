import { getDb } from './db.js';
import { levelForXp, patentForLevel } from './progress.js';

export const RANKED_PLAYERS_SQL = `
  WITH ranked AS (
    SELECT id, username, (avatar IS NOT NULL) AS has_avatar, avatar_version, xp, kills, deaths,
      ROW_NUMBER() OVER (ORDER BY xp DESC, created_at ASC, id ASC) AS player_rank
    FROM accounts
  )
  SELECT id, username, has_avatar, avatar_version, xp, kills, deaths, player_rank AS \`rank\`
  FROM ranked
  WHERE (? = '' OR INSTR(lower(username), lower(?)) > 0)
  ORDER BY player_rank
  LIMIT ? OFFSET ?
`;

export const RANK_COUNT_SQL = `
  SELECT count(*) AS total
  FROM accounts
  WHERE (? = '' OR INSTR(lower(username), lower(?)) > 0)
`;

export const PLAYER_RANK_SQL = `
  SELECT player_rank AS \`rank\`, total
  FROM (
    SELECT id,
      ROW_NUMBER() OVER (ORDER BY xp DESC, created_at ASC, id ASC) AS player_rank,
      count(*) OVER () AS total
    FROM accounts
  ) ranked
  WHERE id = ?
`;

export const PLAYER_RANK_BY_USERNAME_SQL = `
  SELECT player_rank AS \`rank\`, total
  FROM (
    SELECT username_norm,
      ROW_NUMBER() OVER (ORDER BY xp DESC, created_at ASC, id ASC) AS player_rank,
      count(*) OVER () AS total
    FROM accounts
  ) ranked
  WHERE username_norm = ?
`;

function playerSummary(row, selfId) {
  const level = levelForXp(row.xp);
  return {
    username: row.username,
    displayName: row.username,
    avatar: row.has_avatar ? Number(row.avatar_version) : null,
    level: level.level,
    patent: patentForLevel(level.level),
    xp: Number(row.xp),
    kd: Number(row.deaths) ? Number(row.kills) / Number(row.deaths) : Number(row.kills),
    rank: Number(row.rank),
    relation: row.id === selfId ? 'me' : 'none',
  };
}

export async function leaderboard(accountId, query, limit, offset) {
  const sql = getDb();
  const [players, count, me] = await Promise.all([
    sql.query(RANKED_PLAYERS_SQL, [query, query, limit, offset]),
    sql.query(RANK_COUNT_SQL, [query, query]),
    sql.query(PLAYER_RANK_SQL, [accountId]),
  ]);
  const total = Number(count[0]?.total || 0);
  return {
    players: players.map((row) => playerSummary(row, accountId)),
    more: offset + players.length < total,
    me: me[0] ? { rank: Number(me[0].rank), total: Number(me[0].total) } : null,
  };
}

export function publicPlayer(row, rankRow, recent, self) {
  const level = levelForXp(row.xp);
  return {
    user: {
      username: row.username,
      displayName: row.username,
      avatar: row.has_avatar ? Number(row.avatar_version) : null,
      createdAt: row.created_at,
    },
    level,
    patent: patentForLevel(level.level),
    rank: rankRow ? Number(rankRow.rank) : null,
    relation: self ? 'me' : 'none',
    stats: {
      kills: Number(row.kills), deaths: Number(row.deaths), assists: Number(row.assists),
      matches: Number(row.matches), wins: Number(row.wins), headshots: Number(row.headshots),
      shots: Number(row.shots), hits: Number(row.hits), bestStreak: Number(row.best_streak),
    },
    recent: recent.map((match) => ({
      ...match,
      online: !!match.online,
      kills: Number(match.kills),
      deaths: Number(match.deaths),
    })),
  };
}
