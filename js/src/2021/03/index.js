/* eslint-disable no-param-reassign */

import { range, solution } from '../../utils/index.js';

const parse = (input) =>
  input
    .trim()
    .split('\n')
    .map((s) => s.split('').map(Number));

const analyzeBitAt = (index, nrs) =>
  nrs.reduce(
    (counts, nr) => {
      if (nr[index] === 0) {
        counts.zeroes++;
      } else {
        counts.ones++;
      }
      return counts;
    },
    { zeroes: 0, ones: 0 },
  );

export const partOne = solution((input) => {
  const nrs = parse(input);

  const { length } = nrs[0];
  const indices = range({ length });

  let gamma = 0;
  let epsilon = 0;
  for (const index of indices) {
    const { zeroes, ones } = analyzeBitAt(index, nrs);
    const value = 1 << (length - index - 1);
    if (zeroes > ones) {
      gamma += value;
    } else {
      epsilon += value;
    }
  }

  return gamma * epsilon;
});

export const partTwo = solution((input) => {
  const nrs = parse(input);

  const { length } = nrs[0];
  const indices = range({ length });

  let oxygens = nrs.slice();
  let co2s = nrs.slice();

  for (const index of indices) {
    if (oxygens.length > 1) {
      const { zeroes, ones } = analyzeBitAt(index, oxygens);
      oxygens = oxygens.filter((entry) => entry[index] === (ones >= zeroes ? 1 : 0));
    }

    if (co2s.length > 1) {
      const { zeroes, ones } = analyzeBitAt(index, co2s);
      co2s = co2s.filter((entry) => entry[index] === (zeroes > ones ? 1 : 0));
    }
  }

  const oxygen = parseInt(oxygens[0].join(''), 2);
  const co2 = parseInt(co2s[0].join(''), 2);
  return oxygen * co2;
});
