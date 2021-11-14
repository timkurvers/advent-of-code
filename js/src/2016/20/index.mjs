import { cast, solution } from '../../utils';

const TOTAL_IPS = 4294967296;

const parse = (input) => {
  const ranges = input.trim().split('\n').map((range) => {
    const [min, max] = range.split('-');
    return { min: cast(min), max: cast(max) };
  });
  ranges.sort((a, b) => {
    if (a.min === b.min) {
      return a.max - b.max;
    }
    return a.min - b.min;
  });
  return ranges;
};

export const partOne = solution((input) => {
  const ranges = parse(input);

  let minimum = 0;
  for (const range of ranges) {
    if (minimum >= range.min && minimum <= range.max) {
      minimum = range.max + 1;
    }
  }
  return minimum;
});

export const partTwo = solution((input) => {
  const ranges = parse(input);

  let blacklisted = 0;
  let current = 0;
  for (const range of ranges) {
    if (current < range.min) {
      current = range.min;
    }

    if (current >= range.min && current <= range.max) {
      const diff = range.max - Math.max(current, range.min) + 1;
      blacklisted += diff;
      current = range.max + 1;
    }
  }

  return TOTAL_IPS - blacklisted;
});
