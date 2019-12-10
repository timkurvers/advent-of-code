/* eslint-disable no-param-reassign */

export const TAU = 2 * Math.PI;

export const sum = array => array.reduce((total, next) => total + next, 0);

export const maxIndex = array => array.reduce((current, value, index) => (
  value > array[current] ? index : current
), 0);

export const reduceMinBy = (array, prop) => array.reduce((candidate, other) => (
  candidate[prop] > other[prop] ? other : candidate
));

export const reduceMaxBy = (array, prop) => array.reduce((candidate, other) => (
  candidate[prop] < other[prop] ? other : candidate
));

// See: https://stackoverflow.com/a/37580979
export function* permute(permutation) {
  const { length } = permutation;
  const c = Array(length).fill(0);
  let i = 1;
  let k = null;
  let p = null;

  yield permutation.slice();
  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = permutation[i];
      permutation[i] = permutation[k];
      permutation[k] = p;
      ++c[i];
      i = 1;
      yield permutation.slice();
    } else {
      c[i] = 0;
      ++i;
    }
  }
}
