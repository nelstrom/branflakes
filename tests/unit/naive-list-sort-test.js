import { module, test } from 'qunit';
import { listSort } from 'branflakes/utils/naive-list-sort';

const original = [
  {
    name: 'apple',
    position: 1,
  },
  {
    name: 'bear',
    position: 2,
  },
  {
    name: 'orange',
    position: 3,
  },
  {
    name: 'pear',
    position: 4,
  },
];

module('List sort (naive)', function () {
  test('sort by name', function (assert) {
    const sorted = listSort(original, 'name');
    assert.deepEqual(
      sorted.map((item) => item.name),
      ['apple', 'bear', 'orange', 'pear'],
      'List is sorted alphabetically by "name" field'
    );
  });

  test('sort by position', function (assert) {
    const sorted = listSort(original, 'position');
    assert.deepEqual(
      sorted.map((item) => item.position),
      [1, 2, 3, 4],
      'List is sorted numerically by "position" field'
    );
  });
});
