/* eslint-disable import/prefer-default-export, no-param-reassign */

// See: https://en.wikipedia.org/wiki/Bisection_method
// And: https://github.com/mikolalysenko/bisect
export const bisect = (lower, upper, tolerance, predicate) => {
  while (upper - lower > tolerance) {
    const middle = Math.floor((upper + lower) / 2);
    if (predicate(middle)) {
      upper = middle;
    } else {
      lower = middle;
    }
  }
  return lower;
};
