/* eslint-disable import/prefer-default-export */

export const wait = duration => (
  new Promise(resolve => setTimeout(resolve, duration))
);
