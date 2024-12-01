/* eslint-disable no-cond-assign, no-param-reassign */

import { cast, solution } from '../../utils/index.js';

const MAP_HEADER_MATCHER = /(\w+)-to-(\w+)/;
const MAP_MATCHER = /(\d+) (\d+) (\d+)/g;

const parse = (input) => {
  const [first, ...blocks] = input.trim().split('\n\n');

  const seeds = first.match(/\d+/g).map(cast);

  const cache = {};
  for (const block of blocks) {
    const [_, from, to] = MAP_HEADER_MATCHER.exec(block);

    cache[from] = { to, ranges: [] };
    for (const match of block.matchAll(MAP_MATCHER)) {
      const [dstStart, srcStart, length] = [+match[1], +match[2], +match[3]];
      const diff = dstStart - srcStart;
      cache[from].ranges.push({ dstStart, srcStart, diff, length });
    }

    // Ensure order is based on source range start
    cache[from].ranges.sort((a, b) => a.srcStart - b.srcStart);
  }

  // Resolves given nr (of given type) to its final 'location' nr
  const resolve = (nr, type = 'seed') => {
    let target = cache[type];

    do {
      for (const range of target.ranges) {
        if (nr < range.srcStart || nr > range.srcStart + range.length - 1) {
          continue;
        }
        nr += range.diff;
        break;
      }
      target = cache[target.to];
    } while (target);

    return nr;
  };

  return { resolve, seeds };
};

export const partOne = solution((input) => {
  const { seeds, resolve } = parse(input);

  const locations = seeds.map((seed) => resolve(seed));
  return Math.min(...locations);
});

export const partTwo = solution.inefficient((input) => {
  const { seeds, resolve } = parse(input);

  let min = Infinity;

  // Brute-force #yolo
  for (let i = 0; i < seeds.length; i += 2) {
    const start = seeds[i];
    const end = start + seeds[i + 1];
    for (let seed = start; seed < end; ++seed) {
      const nr = resolve(seed);
      if (nr < min) {
        min = nr;
      }
    }
  }

  return min;
});
