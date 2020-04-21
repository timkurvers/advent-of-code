/* eslint-disable import/prefer-default-export, no-param-reassign */

// See: https://en.wikipedia.org/wiki/Bisection_method
// And: https://github.com/3rd-Eden/node-bisection
export const bisect = ({
  lower,
  upper,
  until,
} = {}) => {
  while (lower < upper) {
    const middle = (upper + lower) >> 1;
    if (until(middle)) {
      upper = middle;
    } else {
      lower = middle + 1;
    }
  }
  return lower;
};
