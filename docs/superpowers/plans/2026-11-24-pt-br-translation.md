# Portuguese (Brazil) Translation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Brazilian Portuguese (PT-BR) as a third language of « Riposte: Frontline » — dictionary, runtime wiring, build/check integration, UI option, locale handling, docs.

**Architecture:** Follow the existing French-source → English-translation pattern: add a PT-BR dictionary keyed by French source strings, wire the new language code through the runtime, build and checks, translate content, and keep FR/EN behavior intact.

**Tech Stack:** Vanilla JavaScript game source (`src/*.js`, `shell.html`), Python tooling (`build.py`, `tools/i18n.py`, `tools/dev/*`), static site artifacts (`dist/`).

**Spec:** `docs/superpowers/specs/2026-11-24-pt-br-translation-design.md`

## Global Constraints

- Translation keys are the French source strings passed to `_t(...)`; the PT-BR dictionary uses the same keys and the same `{n}` placeholders (parity enforced by checks).
- Build marker for the PT dictionary: `/*__I18N_PT__*/` (must appear exactly once in `src/`).
- Checks: every used key must have a PT translation, no unused PT entries, placeholders equal, no raw French left in code (except `i18n/ignore.txt`).
- PT plural: singular iff `n === 1`; plural for `0` and `n >= 2`.
- PT percent format: `10%`; numbers/dates via locale `pt-BR`.
- Missing PT key → fall back to the French source string.

## Review Focus

1. Missing PT key fallback (French source) — pinned in Task 4.
2. PT plural selection (`n === 1` singular).
3. PT locale numbers/dates (`pt-BR`).
4. PT ordinals (`1º`, `2º`, `3º`).
5. PT validation in dev checks.

---

## Tasks

### Task 1: PT dictionary infrastructure

**Files:**
- Create: `i18n/pt-BR.txt`
- Modify: `tools/i18n.py`

**Interfaces:**
- Consumes: existing French dictionary loader contract `load_en() -> (dict, errors)`.
- Produces: PT dictionary loader returning `(pt_dict, errors)`.

- [ ] **Step 1: Generalize dictionary loading in `tools/i18n.py`**
  - Load language files from `i18n/*.txt`, skipping `ignore.txt`, keyed by language code (e.g. `en` from `en.txt`, `pt-BR` from `pt-BR.txt`).
  - Keep `load_en` working (used by `build.py` and `check_i18n.py`).

- [ ] **Step 2: Create `i18n/pt-BR.txt`**
  - Header comment: `# Dictionnaire portugais (Brésil) du jeu : « texte français ⇒ traduction » (voir src/00-i18n.js, README « Langues »).`
  - Separator: ` ⇒ `; ` = ` means identical-to-source (proper names).

- [ ] **Step 3: Verify loader**
  - Run the i18n load path (via check tooling) and confirm PT entries parse.

### Task 2: PT validation in dev checks

**Files:**
- Modify: `tools/dev/i18n_keys.py`, `tools/dev/check_i18n.py`, `tools/i18n.py`

**Interfaces:**
- Consumes: key extraction (`all_keys`, `shell_keys`), dictionary maps.
- Produces: PT key-coverage checks (used keys covered, unused entries flagged, placeholder parity).

- [ ] **Step 1: Add PT dictionary loading/validation hooks**
  - Wire PT dictionary into `check_i18n.py` (used-key coverage, entry usage, placeholder parity, no raw French in PT values).

- [ ] **Step 2: Run `python3 tools/dev/check_i18n.py`**
  - Expected: pass (after PT content is authored).

### Task 3: Build integration

**Files:**
- Modify: `build.py`

**Interfaces:**
- Consumes: `i18n.load_en()` / new PT loader.
- Produces: injected `/*__I18N_PT__*/` marker value.

- [ ] **Step 1: Load PT dictionary in `build.py`**
  - Add marker replacement for `/*__I18N_PT__*/` → JSON of PT dict (with same `<` escaping).

- [ ] **Step 2: Run `python3 build.py`**
  - Expected: builds, marker found exactly once, injected.

### Task 4: Runtime PT wiring

**Files:**
- Modify: `src/00-i18n.js`

**Interfaces:**
- Consumes: `I18N_EN` injection marker value.
- Produces: PT resolution via `I18N_PT`.

- [ ] **Step 1: Add `'pt'` language support**
  - `LANG_PREF` accepts `pt`; auto-detect accepts `pt`/`pt-BR` → `pt`.
  - `LANG` effective values: `en`, `fr`, `pt`.
  - `LOCALE`: `pt-BR` for `pt`.
  - `PCT`: `10%` for `pt`.
  - `_t`: resolve PT dictionary for `LANG === 'pt'`, fallback to French source.
  - `_tn`: singular iff `n === 1`.
  - `i18nDom`: translate for `LANG === 'pt'` as well.
  - `document.title`: translate for `PT`.
  - `document.documentElement.lang = 'pt-BR'` for `pt`.

- [ ] **Step 2: Syntax check**
  - Run `node --check` on assembled script (via build) or the src file.

### Task 5: UI, news and locale consumers

**Files:**
- Modify: `src/09e-menus.js`, `src/09f-news.js`, `src/09-game.js`, `src/09n-armurerie.js`, `src/09j-compte.js`, `src/05a-sfx.js`, `src/06r-arsenal.js`, others as needed.

**Interfaces:**
- Consumes: `LANG`, `LANG_PREF`, `_t`, `_tn`, locale helpers, `PCT`.
- Produces: PT option in language select; PT news fields; PT ordinals; PT numbers.

- [ ] **Step 1: Language select option**
  - Add `['pt', 'Português']` to `OPT_TABS` lang select in `src/09e-menus.js`.

- [ ] **Step 2: News fields**
  - `src/09f-news.js`: use `_pt` fields when `LANG === 'pt'`.

- [ ] **Step 3: Locale/format consumers**
  - `src/09-game.js`: PT ordinal branch (`1º`).
  - `src/09n-armurerie.js`: `toLocaleString('pt-BR')`.
  - `src/09j-compte.js`: locale-aware formatting.
  - `src/05a-sfx.js`: voice pack key `voix_pt`.
  - `src/06r-arsenal.js`: `X-Lang` header value `pt`.

### Task 6: Shell, docs, visual tooling

**Files:**
- Modify: `shell.html`, `README.md`, `tools/dev/visual/langues.js`, `tools/dev/visual/*.js` (settings defaults where relevant).

- [ ] **Step 1: Shell**
  - `<html lang="pt-BR">` handling / default; OG locale fields; JSON-LD `inLanguage` add `pt`.

- [ ] **Step 2: Docs**
  - `README.md`: add PT dictionary row / Langues section note.

- [ ] **Step 3: Visual tooling**
  - `tools/dev/visual/langues.js`: accept `pt` run.

### Task 7: Author PT-BR translations

**Files:**
- Modify: `i18n/pt-BR.txt`

**Interfaces:**
- Consumes: French source keys (`all_keys`) + English translations for reference.
- Produces: PT-BR translations for all used keys.

- [ ] **Step 1: Author PT-BR dictionary content**
  - Translate each French source key → PT-BR; keep placeholders; proper names via `=`.

- [ ] **Step 2: Verify placeholder parity and usage**
  - Run checks.

### Task 8: Full verification

**Files:** n/a

- [ ] **Step 1: Run `python3 tools/dev/check_i18n.py`** → 0 errors.
- [ ] **Step 2: Run `python3 build.py`** → clean build with PT dictionary.
- [ ] **Step 3: Grep assembled output for PT wiring sanity.
- [ ] **Step 4: Summarize remaining content gaps (e.g. keys missing PT translation).

---

## Self-Review (writing-plans)

1. **Spec coverage:** Each spec section maps to tasks: intent → Tasks 4–7; goals → Tasks 1–8; constraints → Tasks 1,2,3,4; decisions → Tasks 4,5; risks → Task 8.
2. **Step scan:** Steps are single actions with checkable results; no open-ended filler.
3. **Type consistency:** Task 4 produces `LANG='pt'` contract consumed by Tasks 5–6 — consistent.
4. **Review Focus:** covered by plan items in Review Focus section (tasks 4, 5 verify).
5. **Proportion:** Plan tasks map 1:1 to design implementation map; no code transcribed.

## Execution Handoff

**Plan complete and saved to `docs/superpowers/plans/2026-11-24-pt-br-translation.md`. Please review the plan. Which execution approach would you prefer?**

- **Subagent-driven** — fresh subagent per task + reviewer per task + branch review.
- **Native** — I implement every task myself in this session, then one fresh reviewer on the most capable model checks the whole branch.

Given the user's directive "sim faça logo", execution should proceed without further planning questions. Recommend **native**, and proceed task-by-task.
