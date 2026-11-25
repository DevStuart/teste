CREATE TABLE IF NOT EXISTS accounts (
  id CHAR(36) NOT NULL PRIMARY KEY,
  username VARCHAR(16) NOT NULL,
  username_norm VARCHAR(16) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  recovery_hash CHAR(64) NOT NULL,
  recovery_confirmed BOOLEAN NOT NULL DEFAULT FALSE,
  avatar MEDIUMBLOB,
  avatar_type VARCHAR(16),
  avatar_version BIGINT UNSIGNED NOT NULL DEFAULT 0,
  xp BIGINT UNSIGNED NOT NULL DEFAULT 0,
  kills BIGINT UNSIGNED NOT NULL DEFAULT 0,
  deaths BIGINT UNSIGNED NOT NULL DEFAULT 0,
  assists BIGINT UNSIGNED NOT NULL DEFAULT 0,
  matches BIGINT UNSIGNED NOT NULL DEFAULT 0,
  wins BIGINT UNSIGNED NOT NULL DEFAULT 0,
  headshots BIGINT UNSIGNED NOT NULL DEFAULT 0,
  shots BIGINT UNSIGNED NOT NULL DEFAULT 0,
  hits BIGINT UNSIGNED NOT NULL DEFAULT 0,
  best_streak BIGINT UNSIGNED NOT NULL DEFAULT 0,
  seconds BIGINT UNSIGNED NOT NULL DEFAULT 0,
  arsenal JSON NOT NULL,
  terms_accepted_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  CONSTRAINT accounts_username_format CHECK (username REGEXP '^[A-Za-z0-9_]{3,16}$'),
  CONSTRAINT accounts_username_norm CHECK (username_norm = LOWER(username)),
  CONSTRAINT accounts_avatar_type CHECK (avatar_type IS NULL OR avatar_type IN ('image/jpeg', 'image/webp', 'image/png')),
  CONSTRAINT accounts_avatar_pair CHECK ((avatar IS NULL) = (avatar_type IS NULL)),
  CONSTRAINT accounts_wins CHECK (wins <= matches),
  INDEX accounts_rank_idx (xp DESC, created_at, id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_cs;

CREATE TABLE IF NOT EXISTS account_sessions (
  token_hash CHAR(64) NOT NULL PRIMARY KEY,
  account_id CHAR(36) NOT NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  last_seen_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  expires_at DATETIME(3) NOT NULL,
  CONSTRAINT account_sessions_account_fk FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE,
  INDEX account_sessions_account_idx (account_id),
  INDEX account_sessions_expiry_idx (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_cs;

CREATE TABLE IF NOT EXISTS match_tickets (
  token_hash CHAR(64) NOT NULL PRIMARY KEY,
  account_id CHAR(36) NOT NULL,
  map VARCHAR(32) NOT NULL,
  mode VARCHAR(32) NOT NULL,
  online BOOLEAN NOT NULL,
  started_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  consumed_at DATETIME(3),
  CONSTRAINT match_tickets_account_fk FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE,
  INDEX match_tickets_account_idx (account_id, started_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_cs;

CREATE TABLE IF NOT EXISTS account_matches (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  account_id CHAR(36) NOT NULL,
  map VARCHAR(32) NOT NULL,
  mode VARCHAR(32) NOT NULL,
  online BOOLEAN NOT NULL,
  result ENUM('win', 'loss', 'draw', 'quit') NOT NULL,
  duration INT UNSIGNED NOT NULL,
  kills INT UNSIGNED NOT NULL,
  deaths INT UNSIGNED NOT NULL,
  assists INT UNSIGNED NOT NULL,
  headshots INT UNSIGNED NOT NULL,
  shots INT UNSIGNED NOT NULL,
  hits INT UNSIGNED NOT NULL,
  score INT UNSIGNED NOT NULL,
  streak INT UNSIGNED NOT NULL,
  xp INT UNSIGNED NOT NULL,
  played_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  CONSTRAINT account_matches_account_fk FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE,
  INDEX account_matches_recent_idx (account_id, played_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_cs;

CREATE TABLE IF NOT EXISTS auth_rate_limits (
  bucket CHAR(64) NOT NULL PRIMARY KEY,
  attempts INT UNSIGNED NOT NULL,
  expires_at DATETIME(3) NOT NULL,
  INDEX auth_rate_limits_expiry_idx (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_cs;
