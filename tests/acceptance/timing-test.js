import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'branflakes/tests/helpers';
import { module, test } from 'qunit';

module('Acceptance | timing', function (hooks) {
  setupApplicationTest(hooks);

  test('Visit route three', async function (assert) {
    await visit('/three');

    await this.pauseTest();

    assert.dom('#highlighted-block').hasClass('hljs');
  });
});
