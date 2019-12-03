/* eslint-disable import/prefer-default-export */

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
