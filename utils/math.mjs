/* eslint-disable import/prefer-default-export */

export const sum = array => array.reduce((total, next) => total + next, 0);

export const maxIndex = array => array.reduce((current, value, index) => (
  value > array[current] ? index : current
), 0);
