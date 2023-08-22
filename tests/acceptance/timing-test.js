import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'branflakes/tests/helpers';
import { module, test } from 'qunit';
import { flakeTime } from 'branflakes/utils/timeout';

module('Acceptance | timing', function (hooks) {
  setupApplicationTest(hooks);

  test('Visit route three', async function (assert) {
    await visit('/three');

    await flakeTime();

    assert.dom('#highlighted-block').hasClass('hljs');
  });
});
