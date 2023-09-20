// import { setupBrowserFakes } from 'ember-browser-services/test-support';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'branflakes/tests/helpers';
import { module, test } from 'qunit';

module('Acceptance | leaky state', function (hooks) {
  setupApplicationTest(hooks);

  test('Visit route one', async function (assert) {
    await visit('/one');
    assert.strictEqual(window.myGlobalVariable, 'Uno');
  });

  test('Visit route two', async function (assert) {
    await visit('/two');
    assert.strictEqual(window.myGlobalVariable, 'Dos');
  });

  test('Visit route three', async function (assert) {
    await visit('/three');
    assert.strictEqual(window.myGlobalVariable, undefined);
  });
});
