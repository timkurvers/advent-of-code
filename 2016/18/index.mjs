import { day } from '..';

import examples from './input/examples';
import puzzleInput from './input';

const Tile = {
  SAFE: '.',
  TRAP: '^',
};

const SAFE_TILE_MATCHER = /\./g;

const next = (row) => {
  const width = row.length;

  let result = '';
  for (let x = 0; x < width; ++x) {
    const ltrap = row[x - 1] === Tile.TRAP;
    const ctrap = row[x] === Tile.TRAP;
    const rtrap = row[x + 1] === Tile.TRAP;

    const trap = (
      (ltrap && ctrap && !rtrap)
      || (!ltrap && ctrap && rtrap)
      || (ltrap && !ctrap && !rtrap)
      || (!ltrap && !ctrap && rtrap)
    );

    result += trap ? Tile.TRAP : Tile.SAFE;
  }
  return result;
};

const traverse = (input, { numRows } = {}) => {
  let safeCount = input.match(SAFE_TILE_MATCHER).length;

  let previous = input;
  for (let y = 1; y < numRows; ++y) {
    const current = next(previous);
    safeCount += current.match(SAFE_TILE_MATCHER).length;
    previous = current;
  }

  return { safeCount };
};

day(18).part(1).test(examples).feed(puzzleInput).solution((input, isExample) => {
  const numRows = isExample ? 10 : 40;
  return traverse(input, { numRows }).safeCount;
});

day(18).part(2).test(examples).feed(puzzleInput).inefficient.solution((input) => {
  const numRows = 400000;
  return traverse(input, { numRows }).safeCount;
});
