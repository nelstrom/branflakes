import { module, test } from 'qunit';

module('Which would you rather debug?', function () {
  test('99% failure rate', function (assert) {
    assert.true(Math.random() < 0.01);
  });

  test('99% success rate', function (assert) {
    assert.true(Math.random() < 0.99);
  });
});
