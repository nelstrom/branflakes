import { module, test } from 'qunit';

module('Which is better?', function () {
  test('50% success rate', function (assert) {
    assert.true(Math.random() < 0.5);
  });

  test('99% success rate', function (assert) {
    assert.true(Math.random() < 0.99);
  });
});
