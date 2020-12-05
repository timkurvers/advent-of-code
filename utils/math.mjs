/* eslint-disable no-param-reassign */

import { Cache } from '.';

export const TAU = 2 * Math.PI;

export const bitsNeededFor = (n) => Math.log2(n) + 1 | 0;

export const multiply = (array) => array.reduce((total, next) => total * next, 1);
export const sum = (array) => array.reduce((total, next) => total + next, 0);

export const maxIndex = (array) => array.reduce((current, value, index) => (
  value > array[current] ? index : current
), 0);

export const groupBy = (array, prop) => array.reduce((groups, current) => {
  const value = current[prop];
  const group = groups.lookup(value);
  group.push(current);
  return groups;
}, new Cache(() => []));

export const reduceMinBy = (array, prop) => array.reduce((candidate, other) => (
  candidate[prop] > other[prop] ? other : candidate
));

export const reduceMaxBy = (array, prop) => array.reduce((candidate, other) => (
  candidate[prop] < other[prop] ? other : candidate
));

// Adjusted from: https://gist.github.com/axelpale/3118596
export function* combine(array, { k } = {}) {
  const n = array.length;
  if (k === undefined) {
    for (k = 1; k <= n; ++k) {
      yield* combine(array, { k });
    }
    return;
  }

  if (k > n || k <= 0) {
    return;
  }

  if (k === 1) {
    for (let i = 0; i < n; ++i) {
      yield [array[i]];
    }
    return;
  }

  for (let i = 0; i < n - k + 1; ++i) {
    const head = array.slice(i, i + 1);
    const subsets = combine(array.slice(i + 1), { k: k - 1 });
    for (const subset of subsets) {
      yield head.concat(subset);
    }
  }
}

// See: https://stackoverflow.com/a/37580979
export function* permute(array) {
  const { length } = array;
  const c = Array(length).fill(0);
  let i = 1;
  let k = null;
  let p = null;

  yield array.slice();
  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = array[i];
      array[i] = array[k];
      array[k] = p;
      ++c[i];
      i = 1;
      yield array.slice();
    } else {
      c[i] = 0;
      ++i;
    }
  }
}

// Greatest common divisor / least common multiple of two or more integers
// See: https://stackoverflow.com/a/34955386
export const gcd2 = (a, b) => {
  if (!b) {
    return b === 0 ? a : NaN;
  }
  return gcd2(b, a % b);
};
export const lcm2 = (a, b) => (a * b) / gcd2(a, b);
export const gcd = (array) => array.reduce(gcd2);
export const lcm = (array) => array.reduce(lcm2);
