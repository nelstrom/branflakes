import { module, test } from 'qunit';
import { listSort } from 'branflakes/utils/list-sort';

const original = [
  {
    name: 'orange',
    position: 1,
  },
  {
    name: 'pear',
    position: 4,
  },
  {
    name: 'apple',
    position: 3,
  },
  {
    name: 'bear',
    position: 2,
  },
];

module('List sort (hardboiled)', function () {
  test('sort by name', function (assert) {
    const sorted = listSort(original, 'name');
    assert.deepEqual(
      sorted.map((item) => [item.position, item.name]),
      [
        [3, 'apple'],
        [2, 'bear'],
        [1, 'orange'],
        [4, 'pear'],
      ],
      'List is sorted alphabetically by "name" field'
    );
  });

  test('sort by position', function (assert) {
    const sorted = listSort(original, 'position');
    assert.deepEqual(
      sorted.map((item) => [item.position, item.name]),
      [
        [1, 'orange'],
        [2, 'bear'],
        [3, 'apple'],
        [4, 'pear'],
      ],
      'List is sorted numerically by "position" field'
    );
  });
});
