import { Grid, cast, solution } from '../../utils/index.js';

const parse = (input) => Grid.from(input, { cast });

const isVisible = (tree, direction) => {
  let next = tree[direction];
  while (next) {
    if (next.value >= tree.value) {
      return false;
    }
    next = next[direction];
  }
  return true;
};

const score = (tree, direction) => {
  let count = 0;
  let next = tree[direction];
  while (next) {
    ++count;
    if (next.value >= tree.value) {
      return count;
    }
    next = next[direction];
  }
  return count;
};

export const partOne = solution((input) => {
  const trees = parse(input);

  const visible = trees.filter(
    (tree) =>
      isVisible(tree, 'up') || isVisible(tree, 'down') || isVisible(tree, 'left') || isVisible(tree, 'right'),
  );
  return visible.length;
});

export const partTwo = solution((input) => {
  const grid = parse(input);

  const scores = grid.map(
    (tree) => score(tree, 'up') * score(tree, 'down') * score(tree, 'left') * score(tree, 'right'),
  );
  return Math.max(...scores);
});
