<h1 align="center"><img src="assets/logo.webp" alt="Riposte: Frontline" width="640"></h1>

**Riposte: Frontline** is a free first-person shooter played in the browser, on desktop and on phones, in the spirit of modern
Call of Duty games: https://www.playriposte.com

This repository is a snapshot of the game's source code, version 5.6.0. It is updated from time to time, not with every
release of the game. You can read it,
download it and use it for your own games under the MIT License (`LICENSE`), except for the items listed in `NOTICE.md` (name and
logo, music, soldier animations, some sounds). Development happens elsewhere, so pull requests are not merged. To report a problem,
use the Community space in the game.

## What is inside

The whole game: renderer (three.js), maps, scenery, weapons, soldiers and outfits, bots, physics, sound, menus, keyboard, mouse,
gamepad and touch controls, browser to browser multiplayer. All geometry is built by code, with no imported 3D model.

This snapshot includes a MySQL-backed account API for registration, sign-in, fixed public usernames, recovery codes, saved
account progression, match history, and military-style ranks. The public leaderboard and player profiles are included. Friends, community, moderation, and the game server for online lobbies
are not included. Online matches still run from browser to browser (PeerJS), so match summaries are
bounded and scored by the API but cannot be fully verified as cheat-proof.

The account API is optional for local play. The local development setup below runs the game and API against a MySQL container.

## Build and play

Nothing to install, Python 3 is enough:

```bash
python3 build.py
```

The script assembles `dist/riposte-frontline.html`, the game page, along with `dist/tex/` and `dist/sfx/` (textures and sounds,
loaded when a map starts). Open `dist/riposte-frontline.html` in a recent browser (Chrome, Edge, Firefox) with those folders next to
it. The `dist/` folder of this repository is already built.

## Run locally with MySQL accounts

Requirements: Docker Desktop, Node.js 20 or newer, and Python 3. The included MySQL container listens only on
`127.0.0.1:3307`; its development credentials are disposable and must never be reused in production.

```powershell
docker compose up -d mysql
npm ci
npm run migrate
npm run build
npm run dev
```

Open `http://127.0.0.1:8000/riposte-frontline.html`. The MySQL data is stored in the `riposte_mysql_data` Docker volume and
survives container restarts. Stop the database with `docker compose stop mysql`.

The local server defaults to `DATABASE_URL=mysql://riposte_local:riposte_local_dev_only@127.0.0.1:3307/riposte_frontline`.
Set `DATABASE_URL` in the shell before `npm run migrate` or `npm run dev` to use a different local MySQL database. If port 8000
is already in use, run `$env:PORT=8001; npm run dev` in PowerShell and open port 8001 instead.

## Account API deployment

The API uses MySQL and Vercel Node.js functions. Provision a MySQL database, set its connection URI as `DATABASE_URL` in the
deployment environment, install the root dependencies with `npm ci`, then run `npm run migrate` once against that database.
Deploy the `api/` functions and serve `dist/` from the same HTTPS origin. The API does not include production credentials or
provision a database.

Account usernames are case-insensitively unique, 3–16 ASCII letters, numbers, or underscores, and are permanent. Passwords are
stored using scrypt; sessions use HttpOnly, SameSite cookies; recovery codes are shown once and only their hashes are stored.
Account XP and rank are derived on the server from the existing 1–100 XP curve. The browser does not submit XP or rank values.

## How the code is organized

The game is written in French: code, comments and tool output. `src/*.js` is joined in alphabetical order, then injected into
`shell.html` (page, styles and menus). Each function is declared only once (`python3 tools/dev/check_decl.py`).

| Files | Content |
| --- | --- |
| `src/00-*`, `src/01-*` | translations, startup, rendering and GPU settings |
| `src/02-*` | maps and scenery: terrain, materials, lighting, water, vegetation, each map's kit |
| `src/03-*`, `src/07-*` | bot navigation and AI |
| `src/04-*` | effects, object physics |
| `src/05-*` | sound |
| `src/06-*` | weapons and their models, soldiers, animations, outfits, ragdolls |
| `src/08-*` | player, controls, killstreaks, vehicles |
| `src/09-*` | match, loading, network, menus, touch and gamepad controls, interface |
| `i18n/en.txt`, `i18n/pt-BR.txt` | English and Brazilian Portuguese translations (French is the source language) |
| `assets/` | textures, sounds, baked animations, icons |
| `tools/` | asset building (`build_*.py`), checks and visual tests (`tools/dev/`) |

## Languages

The game interface is available in French, English, and Brazilian Portuguese. Choose a language in **Options > Game > Language**;
Automatic follows the browser's preferred language (English by default). A language change reloads the game.
Translations live in `i18n/en.txt` and `i18n/pt-BR.txt`; the 10 release notes shown in-game also need `x_pt` and, when present, `title_pt`
in `changelog.json`. Run `python tools/dev/check_i18n.py` to check dictionary coverage, placeholders, and those release notes.

The visual tests in `tools/dev/visual/` open the game in Chromium (`cd tools/dev && npm ci`, then for example
`node tools/dev/visual/menus.js`). To inspect the Portuguese UI for missing keys and leftover French, run
`node tools/dev/visual/langues.js pt-BR`.
