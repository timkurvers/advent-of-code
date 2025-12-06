import { solution } from '../../utils/index.js';

const RANGE_MATCHER = /(\d+)-(\d+)/g;

const parse = (input) => {
  const parts = input.trim().split('\n\n');

  const freshRanges = [];
  for (const match of parts[0].matchAll(RANGE_MATCHER)) {
    const [, lhs, rhs] = match;
    freshRanges.push({ first: +lhs, last: +rhs });
  }

  const ingredients = parts[1].split('\n').map(Number);
  return { freshRanges, ingredients };
};

export const partOne = solution((input) => {
  const { freshRanges, ingredients } = parse(input);

  let count = 0;
  for (const ingredient of ingredients) {
    for (const range of freshRanges) {
      if (range.first <= ingredient && range.last >= ingredient) {
        ++count;
        break;
      }
    }
  }
  return count;
});

export const partTwo = solution((input) => {
  const { freshRanges } = parse(input);

  // Sort by start ID
  const sorted = freshRanges.toSorted((a, b) => a.first - b.first);

  const collated = [];
  let current = null;
  for (const range of sorted) {
    if (!current) {
      current = range;
      collated.push(current);
      continue;
    }

    if (range.first <= current.last) {
      current.last = Math.max(range.last, current.last);
    } else {
      collated.push(range);
      current = range;
    }
  }

  let count = 0;
  for (const range of collated) {
    count += range.last - range.first + 1;
  }

  return count;
});
