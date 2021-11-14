/* eslint-disable no-param-reassign */

export { default as Challenge, SRC_ROOT } from './Challenge';

const augment = (prop) => (fn) => {
  fn[prop] = (...args) => {
    const result = fn(...args);
    result[prop] = true;
    return result;
  };
  return fn;
};

const inefficient = augment('inefficient');

export const example = inefficient((input, expected, args = {}) => ({
  input, expected, args,
}));

export const solution = inefficient((fn = () => {}) => fn);
