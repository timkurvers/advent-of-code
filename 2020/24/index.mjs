import { Grid, solution } from '../../utils';

import HexGridPoint from './HexGridPoint';

const DIRECTION_MATCHER = /se|sw|ne|nw|e|w/g;

const Tile = {
  WHITE: true,
  BLACK: false,
};

const isBlack = (point) => point.value === Tile.BLACK;

const parse = (input) => input.trim().split('\n');

const prepare = (instructions) => {
  const grid = new Grid({ pointClass: HexGridPoint });
  grid.set(0, 0, Tile.WHITE);
  for (const sequence of instructions) {
    let current = grid.getPoint(0, 0);
    for (const direction of sequence.matchAll(DIRECTION_MATCHER)) {
      current = current[direction];
    }
    current.value = !current.value;
    current.touch();
  }
  return grid;
};

const step = (grid) => {
  const next = new Grid({ pointClass: HexGridPoint });
  for (const point of grid) {
    const { q, r } = point;
    let { value } = point;
    const numBlackNeighbors = point.neighbors.filter(isBlack).length;
    if (value === Tile.BLACK && numBlackNeighbors !== 1) {
      value = Tile.WHITE;
    }
    if (value === Tile.WHITE && numBlackNeighbors === 2) {
      value = Tile.BLACK;
    }
    next.set(q, r, value).touch();
  }
  return next;
};

export const partOne = solution((input) => {
  const instructions = parse(input);
  const grid = prepare(instructions);
  return grid.filter(isBlack).length;
});

export const partTwo = solution.inefficient((input) => {
  const instructions = parse(input);
  let current = prepare(instructions);
  for (let day = 1; day <= 100; ++day) {
    current = step(current);
  }
  return current.filter(isBlack).length;
});
