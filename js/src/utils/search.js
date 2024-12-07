/* eslint-disable import/prefer-default-export */

// See: https://en.wikipedia.org/wiki/Bisection_method
// And: https://github.com/3rd-Eden/node-bisection
export const bisect = async ({ lower, upper, until }) => {
  while (lower < upper) {
    const middle = Math.floor((upper + lower) / 2);
    if (await until(middle)) {
      upper = middle;
    } else {
      lower = middle + 1;
    }
  }
  return lower;
};
