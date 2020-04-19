/* eslint-disable import/prefer-default-export */

export const wait = (duration = 0) => {
  if (!duration) {
    return new Promise((resolve) => setImmediate(resolve));
  }
  return new Promise((resolve) => setTimeout(resolve, duration));
};
