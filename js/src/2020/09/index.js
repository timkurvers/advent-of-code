import { solution, sum } from '../../utils/index.js';

const parse = (input) => input.trim().split('\n').map(Number);

// Whether given target number is the sum of two of given candidates
const summable = (target, candidates) => {
  for (const [aindex, a] of candidates.entries()) {
    for (const [bindex, b] of candidates.entries()) {
      if (a + b === target && aindex !== bindex) {
        return true;
      }
    }
  }
  return false;
};

// Find the first number that is not summable from its candidates
const findInvalidNumber = (numbers, { preambleLength }) => {
  const { length } = numbers;
  for (let i = preambleLength; i < length; ++i) {
    const target = numbers[i];
    const candidates = numbers.slice(i - preambleLength, i);
    if (!summable(target, candidates)) {
      return target;
    }
  }
  return null;
};

export const partOne = solution((input, { preambleLength = 25 }) => {
  const numbers = parse(input);
  return findInvalidNumber(numbers, { preambleLength });
});

export const partTwo = solution((input, { preambleLength = 25 }) => {
  const numbers = parse(input);
  const { length } = numbers;
  const target = findInvalidNumber(numbers, { preambleLength });

  // Step through the number list with chunks increasing size until we find
  // a sequence that sums up to our target invalid number
  for (let size = 2; ; ++size) {
    for (let i = 0; i < length - size; ++i) {
      const candidates = numbers.slice(i, i + size);
      if (sum(candidates) === target) {
        const min = Math.min(...candidates);
        const max = Math.max(...candidates);
        return min + max;
      }
    }
  }
});
