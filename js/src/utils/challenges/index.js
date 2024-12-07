export { default as Challenge, PUZZLE_ROOT, SRC_ROOT } from './Challenge.js';

const augment = (prop) => (fn) => {
  fn[prop] = (...args) => {
    const result = fn(...args);
    result[prop] = true;
    return result;
  };
  return fn;
};

const inefficient = augment('inefficient');

export const solution = inefficient((fn = () => {}) => fn);
