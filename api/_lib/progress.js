export const MAX_LEVEL = 100;

export const PATENTS = Object.freeze([
  { id: 'recruit', minLevel: 1, label: 'Recrue' },
  { id: 'private', minLevel: 6, label: 'Soldat' },
  { id: 'corporal', minLevel: 11, label: 'Caporal' },
  { id: 'sergeant', minLevel: 21, label: 'Sergent' },
  { id: 'warrant', minLevel: 31, label: 'Adjudant' },
  { id: 'lieutenant', minLevel: 41, label: 'Lieutenant' },
  { id: 'captain', minLevel: 51, label: 'Capitaine' },
  { id: 'major', minLevel: 61, label: 'Commandant' },
  { id: 'colonel', minLevel: 71, label: 'Colonel' },
  { id: 'general', minLevel: 81, label: 'Général' },
  { id: 'marshal', minLevel: 91, label: 'Maréchal' },
]);

export function xpForLevel(level) {
  const safe = Math.max(1, Math.min(MAX_LEVEL, Math.floor(Number(level) || 1)));
  return Math.round(250 * Math.pow(safe - 1, 1.6));
}

export function levelForXp(xp) {
  const total = Math.max(0, Math.floor(Number(xp) || 0));
  let low = 1, high = MAX_LEVEL;
  while (low < high) {
    const mid = Math.ceil((low + high) / 2);
    if (xpForLevel(mid) <= total) low = mid;
    else high = mid - 1;
  }
  const base = xpForLevel(low), next = low < MAX_LEVEL ? xpForLevel(low + 1) : base;
  return { level: low, xp: total, into: total - base, need: next - base };
}

export function patentForLevel(level) {
  const safe = Math.max(1, Math.min(MAX_LEVEL, Math.floor(Number(level) || 1)));
  return PATENTS.reduce((rank, candidate) => candidate.minLevel <= safe ? candidate : rank, PATENTS[0]);
}

export function calculateMatchXp({ kills, headshots, assists, duration, result, online }) {
  const seconds = Math.max(0, Math.min(3600, Math.floor(Number(duration) || 0)));
  if (seconds < 30) return 0;
  let gained = kills * 50 + headshots * 15 + assists * 20 + Math.floor(seconds / 60) * 20 + 100;
  if (result === 'win') gained += 150;
  else if (result === 'draw') gained += 50;
  if (!online) gained *= 0.5;
  return Math.min(2500, Math.round(gained));
}
