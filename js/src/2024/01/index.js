/* eslint-disable no-param-reassign */

import { solution } from '../../utils/index.js';

const parse = (input) => {
  const lines = input.trim().split('\n');
  const left = [];
  const right = [];
  for (const line of lines) {
    const [lhs, rhs] = line.split(/\s+/).map(Number);
    left.push(lhs);
    right.push(rhs);
  }
  return { left, right };
};

export const partOne = solution((input) => {
  const { left, right } = parse(input);

  left.sort();
  right.sort();

  const distance = left.reduce((total, leftValue, index) => {
    const rightValue = right[index];
    total += Math.abs(leftValue - rightValue);
    return total;
  }, 0);

  return distance;
});

export const partTwo = solution((input) => {
  const { left, right } = parse(input);

  const rightByOccurrence = Object.groupBy(right, (value) => value);

  const similarity = left.reduce((total, leftValue) => {
    total += leftValue * (rightByOccurrence[leftValue]?.length ?? 0);
    return total;
  }, 0);

  return similarity;
});
