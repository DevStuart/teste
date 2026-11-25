import { getDb } from './db.js';
import { levelForXp, patentForLevel } from './progress.js';

const STAT_FIELDS = {
  kills: 'kills',
  deaths: 'deaths',
  assists: 'assists',
  matches: 'matches',
  wins: 'wins',
  headshots: 'headshots',
  shots: 'shots',
  hits: 'hits',
  bestStreak: 'best_streak',
  seconds: 'seconds',
};

export async function accountData(accountId) {
  const sql = getDb();
  const [accounts, matches] = await Promise.all([
    sql`
      SELECT id, username, (avatar IS NOT NULL) AS has_avatar, avatar_version, recovery_confirmed, xp,
        kills, deaths, assists, matches, wins, headshots, shots, hits, best_streak, seconds
      FROM accounts WHERE id = ${accountId} LIMIT 1
    `,
    sql`
      SELECT map, mode, result, online, kills, deaths, xp, played_at
      FROM account_matches WHERE account_id = ${accountId}
      ORDER BY played_at DESC LIMIT 20
    `,
  ]);
  const row = accounts[0];
  if (!row) return { user: null, level: null, stats: null, recent: [] };
  const stats = Object.fromEntries(Object.entries(STAT_FIELDS).map(([key, column]) => [key, Number(row[column])]));
  const level = levelForXp(Number(row.xp));
  return {
    user: {
      username: row.username,
      displayName: row.username,
      avatar: row.has_avatar ? Number(row.avatar_version) : null,
      hasPassword: true,
      hasRecovery: !!row.recovery_confirmed,
    },
    level,
    patent: patentForLevel(level.level),
    stats,
    recent: matches.map((match) => ({
      ...match,
      online: !!match.online,
      kills: Number(match.kills),
      deaths: Number(match.deaths),
      xp: Number(match.xp),
    })),
  };
}

export function integer(value, max = 2147483647) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.min(max, Math.max(0, Math.floor(parsed))) : 0;
}
