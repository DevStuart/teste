import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { API_MESSAGES, apiMessage } from '../api/_lib/i18n.js';

test('account API errors support French, English, and Brazilian Portuguese', () => {
  for (const [source, translations] of Object.entries(API_MESSAGES)) {
    assert.equal(translations.length, 3, `${source} needs translations for all three languages`);
  }
  const message = 'Username or password is incorrect.';
  assert.equal(apiMessage(message, 'fr'), 'Nom ou mot de passe incorrect.');
  assert.equal(apiMessage(message, 'en'), message);
  assert.equal(apiMessage(message, 'pt-BR'), 'Nome de usuário ou senha incorretos.');
});

test('game i18n selects Brazilian Portuguese and formats its locale and plurals', async () => {
  const source = await readFile(new URL('../src/00-i18n.js', import.meta.url), 'utf8');
  const en = { 'Olá, {0}': 'Hello, {0}' };
  const pt = { 'Olá, {0}': 'Olá, {0}', '{0} inimigo': '{0} inimigo', '{0} inimigos': '{0} inimigos' };
  const context = {
    localStorage: { getItem: () => JSON.stringify({ lang: 'pt-BR' }) },
    navigator: { languages: ['en-US'] },
    document: {
      body: {},
      documentElement: { lang: '' },
      title: 'Riposte: Frontline',
      createTreeWalker: () => ({ currentNode: null }),
    },
    NodeFilter: { SHOW_ELEMENT: 1, SHOW_TEXT: 4, FILTER_REJECT: 2, FILTER_ACCEPT: 1 },
  };
  const code = source
    .replace('/*__I18N_EN__*/ {}', JSON.stringify(en))
    .replace('/*__I18N_PT__*/ {}', JSON.stringify(pt))
    + '\nglobalThis.i18nResult = { LANG, LOCALE, _t, _tn, fmtNum };';
  vm.runInNewContext(code, context);

  assert.equal(context.i18nResult.LANG, 'pt-BR');
  assert.equal(context.i18nResult.LOCALE, 'pt-BR');
  assert.equal(context.i18nResult._t('Olá, {0}', 'Elias'), 'Olá, Elias');
  assert.equal(context.i18nResult._tn(0, '{0} inimigo', '{0} inimigos'), '0 inimigos');
  assert.equal(context.i18nResult.fmtNum(1200), '1.200');
});
