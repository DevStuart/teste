# Design: Portuguese (Brazil) translation for « Riposte: Frontline »

- Date: 2026-11-24
- Topic: pt-br-translation
- Status: **draft — awaiting human approval**

## Intent

« Riposte: Frontline » carries its UI text in French, with an English layer on top
(`i18n/en.txt`, injected at build time). The game already ships two languages
(Auto / English / French). The user wants the game translated to Brazilian
Portuguese (PT-BR).

The intent of this change: make the game run in Portuguese, with full UI text,
HUD, menus, news and locale-aware numbers/dates/plurals.

## Goals

- Add PT-BR as a third selectable language (Options > Game > Language), next to
  Auto / English / French.
- Add a PT-BR dictionary keyed by the French source strings (`fr ⇒ pt-BR`), same
  key/placeholder structure as the English dictionary.
- PT-BR strings served through `_t` / `_tn`, DOM translation (`i18nDom`), document
  title, news titles/texts.
- PT-BR locale handling: language code, locale (`pt-BR`), number/date formatting,
  percent format, plural rules, ordinals, `document.documentElement.lang`.
- Build + dev checks + docs updated so the pipeline validates PT-BR like FR/EN.

## Non-goals

- Voice lines for PT-BR (TTS Chatterbox `voix_pt`, reference voice, generation) —
  deferred to a follow-up design/build step.
- News content with PT-BR fields (`*_pt`) stored server-side — follow-up.
- API error messages in PT — out of scope (English remains the reference language).

## Anti-goals

- No regression of existing French/English behavior.

## Constraints

- The source of truth for keys remains the French strings passed to `_t(...)`.
- Placeholder parity: `{0}`, `{1}`, ... must match between source and every
  translation (checked).
- `build.py` requires each marker (`/*__I18N_EN__*/`) to appear exactly once in
  `src/`; a new marker will be introduced for the PT dictionary.
- Dev checks (`tools/dev/check_i18n.py`, `tools/i18n_keys.py`, `tools/i18n.py`)
  enforce: used keys have translations, no unused entries, same placeholders, no
  raw French left in code (except `i18n/ignore.txt`).
- Locale/plural logic lives in `src/00-i18n.js` and is consumed across many
  modules via the `LANG` constant.

## Approaches considered

1. **Add PT-BR as a third language** (chosen): new dictionary file
   `i18n/pt-BR.txt` (fr ⇒ pt-BR); language code `pt`; `_t`/`_tn`/auto-detect/locale
   wiring; build marker `/*__I18N_PT__*/`; checks; settings; docs; shell.
2. Replace the French source strings with PT-BR keys — rejected (massive refactor,
   loses FR/EN pipeline, changes the key model).
3. Translate only the English dictionary — rejected (no PT language code exists).

## Decisions

- Language code: `pt` (stored pref + effective language). Label: `Português`.
- Locale: `pt-BR` (`fr-FR` for fr, `en-US` for en, `pt-BR` for pt).
- Plural: singular iff `n === 1`; plural for `0` and `n >= 2` (PT-BR rules).
- Percent format: `10%` (PT-BR convention, like English).
- Ordinals: PT-BR masculine ordinal indicators (`1º`, `2º`, `3º`) — new branch.
- Numbers/dates: `toLocaleString('pt-BR')`.
- Dictionary loading: generalize `tools/i18n.py` load to read language files
  (`en*.txt` and `pt*.txt`) — to be confirmed in implementation (glob choice).
- Build marker: `/*__I18N_PT__*/` → JSON of the PT dictionary.
- Checks: extend i18n validation to PT dictionary (used keys, placeholders,
  no-unused), no-French-leakage unchanged.

## Implementation map (files to touch)

1. `tools/i18n.py` — load PT dictionary.
2. `tools/dev/i18n_keys.py`, `tools/dev/check_i18n.py` — PT validation.
3. `build.py` — inject `/*__I18N_PT__*/`.
4. `src/00-i18n.js` — `LANG`, `I18N_PT`, `_t`, `_tn`, `i18nDom`, title,
   `documentElement.lang`, auto-detect, locale, PCT, numbers.
5. `src/09e-menus.js` — language select option `['pt', 'Português']`.
6. `src/09f-news.js` — PT news fields (`*_pt`).
7. Other `src/` modules — locale/plural/ordinal/X-Lang branches as needed
   (e.g. `09-game.js` ordinal, `09n-armurerie.js` numbers, `05a-sfx.js` voice pack
   key, `06r-arsenal.js` X-Lang).
8. `shell.html` — `<html lang>`, OG locale fields, JSON-LD `inLanguage`.
9. `tools/dev/visual/langues.js` — PT capture path.
10. `README.md` — dictionary table row + Langues section.

## Builder check (2026-11-24) — resolutions applied to the design

The fresh builder reviewed the draft and raised open questions. Decisions taken
on the builder's recommendation (recorded here as builder calls):

1. Missing PT key fallback → fall back to the French source string (consistent with
   how FR behaves; `_t` keeps the source text when the PT dictionary lacks the key).
2. Auto-detect: browser locales `pt`/`pt-BR` → effective language `pt`; locale
   `pt-BR`; percent format `10%`; `X-Lang` sent as `pt`.
3. Ordinals: new PT branch (`1º`, `2º`, `3º`).
4. Scope of translated strings: UI dictionary + news titles/texts; separately keyed
   game-data fields (the `*_en`-style content) are out of scope.

Deferred by prior decision (unchanged): PT voice lines (TTS) and PT news content
fields.

## Risks / deferred follow-ups

- Voice lines (TTS) for PT-BR — deferred.
- News `_pt` fields — deferred.
- API error messages in PT — out of scope.

## Next steps (after approval)

- Invoke `superpowers:writing-plans` and produce the implementation plan.
- Then implement, run checks (`python3 tools/dev/check_i18n.py`, build).
