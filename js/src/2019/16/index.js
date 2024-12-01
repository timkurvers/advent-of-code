/* eslint-disable no-loop-func, no-param-reassign */

import { solution } from '../../utils/index.js';

const parse = (input) => input.split('').map(Number);

const fft = (list, { basePattern, phases }) => {
  for (let phase = 1; phase <= phases; ++phase) {
    list = list.map((_, i) => {
      const total = list.slice(i).reduce((sum, number, index) => {
        const entry = Math.floor((i + index + 1) / (i + 1)) % basePattern.length;
        const multiplier = basePattern[entry];
        return sum + number * multiplier;
      }, 0);
      return Math.abs(total) % 10;
    });
  }
  return list.join('');
};

// When interested in a specific offset after applying the FFT algo to a given
// input list, a speed optimization can be made if the offset is in the second
// half of the input list as those numbers only rely on previous ones.
//
// Example from https://www.reddit.com/r/adventofcode/comments/ebf5cy:
//
// Input signal: 12345678
//
//   1*1 + ... + 8*0 = 4
//   1*0 + ... + 8*0 = 8
//   1*0 + ... + 8*0 = 2
//   1*0 + ... + 8*0 = 2
//   1*0 + ... + 8*1 = 6 = (8 + 7 + 6 + 5) % 10
//   1*0 + ... + 8*1 = 1 = (8 + 7 + 6) % 10
//   1*0 + ... + 8*1 = 5 = (8 + 7) % 10
//   1*0 + ... + 8*1 = 8 = (8) % 10
//
const fftWithOffset = (list, offset, { basePattern, phases }) => {
  let { length } = list;
  let half = length / 2 | 0;

  // Requested offset is not in the second half, so calculate FFT normally
  if (offset < half) {
    const result = fft(list, { basePattern, phases });
    return result.slice(offset);
  }

  // Create a new list that has the requested offset exactly in the middle so
  // the optimized FFT algo below can be used
  half = length - offset;
  length = half * 2;
  list = list.slice(-length);

  for (let phase = 1; phase <= phases; ++phase) {
    const next = new Array(length);
    next[length - 1] = list[length - 1];
    for (let i = length - 2; i >= 0; --i) {
      next[i] = (list[i] + next[i + 1]) % 10;
    }
    list = next;
  }
  return list.join('').slice(half);
};

export const partOne = solution((input, {
  basePattern = [0, 1, 0, -1],
  phases = 100,
}) => {
  const result = fft(parse(input), { basePattern, phases });
  return result.slice(0, 8);
});

export const partTwo = solution.inefficient((input, {
  basePattern = [0, 1, 0, -1],
  messageLength = 8,
  offsetLength = 7,
  phases = 100,
  repeat = 10000,
}) => {
  const offset = +input.slice(0, offsetLength);
  const signal = parse(input.repeat(repeat));
  const result = fftWithOffset(signal, offset, { basePattern, phases });
  return result.slice(0, messageLength);
});
