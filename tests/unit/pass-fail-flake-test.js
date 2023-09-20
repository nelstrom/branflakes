/* eslint-disable qunit/no-ok-equality */
import { module, test } from 'qunit';

module('What is a flaky test?', function () {
  test('passes', function (assert) {
    assert.true(1 === 1);
  });

  test('fails', function (assert) {
    assert.true(1 === 0);
  });

  test('flakes', function (assert) {
    assert.true(Math.random() < 0.5);
  });
});
