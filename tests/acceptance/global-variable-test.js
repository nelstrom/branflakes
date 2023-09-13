import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'branflakes/tests/helpers';
import { module, test } from 'qunit';
// import { setupBrowserFakes } from 'ember-browser-services/test-support';

module('Acceptance | global variable', function (hooks) {
  setupApplicationTest(hooks);
  // setupBrowserFakes(hooks, { window: true });

  test('Visit route one', async function (assert) {
    // let window = this.owner.lookup('service:browser/window');

    await visit('/one');
    assert.strictEqual(window.myGlobalVariable, 'Hello!');
  });

  test('Visit route two', async function (assert) {
    // let window = this.owner.lookup('service:browser/window');

    await visit('/two');
    assert.strictEqual(window.myGlobalVariable, 'Hi!');
  });

  test('Visit route three', async function (assert) {
    await visit('/three');
    // let window = this.owner.lookup('service:browser/window');

    // This test fails when it runs after 'Visit route two'
    assert.strictEqual(window.myGlobalVariable, undefined);
  });
});
