import { Grid, solution } from '../../utils/index.js';

const ROLL = '@';

const parse = (input) => Grid.from(input);

const isRoll = (point) => point.value === ROLL;
const isForkliftable = (point) => point.value === ROLL && point.neighbors.filter(isRoll).length < 4;

export const partOne = solution((input) => {
  const grid = parse(input);
  return grid.filter(isForkliftable).length;
});

export const partTwo = solution((input) => {
  const grid = parse(input);

  let removed = 0;
  while (true) {
    const rolls = grid.filter(isForkliftable);
    if (!rolls.length) {
      break;
    }

    for (const roll of rolls) {
      roll.value = 'x';
      ++removed;
    }
  }

  return removed;
});
