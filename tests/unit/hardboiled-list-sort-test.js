import { module, test } from 'qunit';
import { listSort } from 'branflakes/utils/list-sort';

const original = [
  {
    name: 'orange',
    position: 3,
  },
  {
    name: 'bear',
    position: 2,
  },
  {
    name: 'apple',
    position: 1,
  },
  {
    name: 'pear',
    position: 4,
  },
];

module('List sort (hardboiled)', function () {
  test('sort by name', function (assert) {
    const sorted = listSort(original, 'name');
    assert.deepEqual(
      sorted.map((item) => item.name),
      ['apple', 'bear', 'orange', 'pear']
    );
  });

  test('sort by position', function (assert) {
    const sorted = listSort(original, 'position');
    assert.deepEqual(
      sorted.map((item) => item.position),
      [1, 2, 3, 4]
    );
  });
});
