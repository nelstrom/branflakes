import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'branflakes/tests/helpers';
import { setupBrowserFakes } from 'ember-browser-services/test-support';
import { module, test } from 'qunit';

module('Acceptance | leaky state', function (hooks) {
  setupApplicationTest(hooks);
  setupBrowserFakes(hooks, { window: true });

  test('Visit route one', async function (assert) {
    const window = this.owner.lookup('service:browser/window');
    await visit('/one');
    assert.strictEqual(window.myGlobalVariable, 'Uno');
  });

  test('Visit route two', async function (assert) {
    const window = this.owner.lookup('service:browser/window');
    await visit('/two');
    assert.strictEqual(window.myGlobalVariable, 'Dos');
  });

  test('Visit route three', async function (assert) {
    const window = this.owner.lookup('service:browser/window');
    await visit('/three');
    assert.strictEqual(window.myGlobalVariable, undefined);
  });
});
