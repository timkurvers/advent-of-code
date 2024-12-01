/* eslint-disable no-param-reassign */

import { bitsNeededFor, reduceMaxBy, solution } from '../../utils/index.js';

const parse = (input) => input.trim().split('\n');

const ROW_COUNT = 128;
const MAX_ROW = ROW_COUNT - 1;
const ROW_BITS = bitsNeededFor(MAX_ROW);

const COLUMN_COUNT = 8;
const MAX_COLUMN = COLUMN_COUNT - 1;

const bps = (ops, { upper, lower = 0 } = {}) => {
  for (const char of ops) {
    const middle = ((upper + lower) / 2) | 0;
    if (char === 'F' || char === 'L') {
      upper = middle;
    } else {
      lower = middle + 1;
    }
  }
  return lower;
};

const seatFor = (specifier) => {
  const row = bps(specifier.slice(0, ROW_BITS), { upper: MAX_ROW });
  const column = bps(specifier.slice(ROW_BITS), { upper: MAX_COLUMN });
  const id = row * COLUMN_COUNT + column;
  return { id, row, column };
};

export const partOne = solution((input) => {
  const specifiers = parse(input);
  const seats = specifiers.map(seatFor);
  return reduceMaxBy(seats, 'id').id;
});

export const partTwo = solution((input) => {
  const specifiers = parse(input);
  const seats = specifiers.map(seatFor);

  const max = MAX_ROW * COLUMN_COUNT + COLUMN_COUNT;
  for (let id = 0, started = false; id <= max; ++id) {
    const seat = seats.find((s) => s.id === id);
    if (started && !seat) {
      return id;
    }
    if (!started && seat) {
      started = true;
    }
  }
  return null;
});
