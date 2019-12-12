/* eslint-disable import/prefer-default-export */

export const wait = () => (
  new Promise(resolve => setImmediate(resolve))
);

export const delay = (duration = 0) => (
  new Promise(resolve => setTimeout(resolve, duration))
);
