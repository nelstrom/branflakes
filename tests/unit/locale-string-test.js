import { module, test } from 'qunit';

module('Locale', function () {
  test('Intl.NumberFormat()', function (assert) {
    const s = Intl.NumberFormat().format(123456.789);
    assert.strictEqual(s, '123,456.789');
  });
});
