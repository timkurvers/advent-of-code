/* eslint-disable no-param-reassign */

import { solution } from '../../utils';

const { isArray } = Array;

const parse = (input) => (
  input.trim().split('\n\n').map((pair) => (
    pair.split('\n').map(JSON.parse)
  ))
);

const compare = (left, right) => {
  if (!isArray(left) && !isArray(right)) {
    if (left < right) return -1;
    if (right < left) return 1;
    return 0;
  }

  if (!isArray(left)) {
    left = [left];
  }

  if (!isArray(right)) {
    right = [right];
  }

  for (let i = 0; i < left.length && i < right.length; ++i) {
    const result = compare(left[i], right[i]);
    if (result !== 0) {
      return result;
    }
  }
  if (left.length < right.length) {
    return -1;
  }
  if (left.length > right.length) {
    return 1;
  }
  return 0;
};

export const partOne = solution((input) => {
  const pairs = parse(input);

  let sum = 0;
  for (const [index, pair] of pairs.entries()) {
    const [left, right] = pair;
    if (compare(left, right) === -1) {
      sum += index + 1;
    }
  }
  return sum;
});

export const partTwo = solution((input) => {
  const packets = parse(input).flat();

  const two = [[2]];
  const six = [[6]];
  packets.push(two, six);

  packets.sort(compare);

  return (packets.indexOf(two) + 1) * (packets.indexOf(six) + 1);
});
