import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'branflakes/tests/helpers';
import { module, test } from 'qunit';

module('Acceptance | global variable', function (hooks) {
  setupApplicationTest(hooks);

  test('Visit route one', async function (assert) {
    await visit('/one');
    assert.strictEqual(window.myGlobalVariable, 'Hello!');
  });

  test('Visit route two', async function (assert) {
    await visit('/two');
    assert.strictEqual(window.myGlobalVariable, 'Hi!');
  });

  test('Visit route three', async function (assert) {
    await visit('/three');
    // This test fails when it runs after 'Visit route two'
    assert.strictEqual(window.myGlobalVariable, 'Hello!');
  });
});
