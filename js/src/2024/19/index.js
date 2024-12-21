import { solution } from '../../utils/index.js';

const parse = (input) => {
  const parts = input.trim().split('\n\n');

  const available = parts[0].split(', ');
  const desired = parts[1].split('\n');

  return { available, desired };
};

// Calculates whether a given design is possible and returns how many variations
const build = (design, available, cache = new Map()) => {
  if (cache.has(design)) {
    return cache.get(design);
  }

  let count = 0;
  for (const pattern of available) {
    if (design.startsWith(pattern)) {
      const remaining = design.slice(pattern.length);

      if (!remaining.length) {
        count += 1;
        continue;
      }

      count += build(remaining, available, cache);
    }
  }
  cache.set(design, count);
  return count;
};

export const partOne = solution((input) => {
  const { available, desired } = parse(input);
  return desired.reduce((sum, design) => {
    if (build(design, available)) {
      return sum + 1;
    }
    return sum;
  }, 0);
});

export const partTwo = solution((input) => {
  const { available, desired } = parse(input);
  return desired.reduce((sum, design) => sum + build(design, available), 0);
});
