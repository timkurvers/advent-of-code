/* eslint-disable no-loop-func, no-param-reassign */

import { solution, sum } from '../../utils';

const parse = (input) => input.split('').map(Number);

const fft = (list, { basePattern, phases }) => {
  for (let phase = 1; phase <= phases; ++phase) {
    list = list.map((_, i) => {
      const parts = list.map((number, index) => {
        const entry = Math.floor((index + 1) / (i + 1)) % basePattern.length;
        const multiplier = basePattern[entry];
        return number * multiplier;
      });
      const total = sum(parts);
      return Math.abs(total) % 10;
    });
  }

  return list.join('');
};

export const partOne = solution((input, {
  basePattern = [0, 1, 0, -1],
  phases = 100,
}) => {
  const result = fft(parse(input), { basePattern, phases });
  return result.slice(0, 8);
});
