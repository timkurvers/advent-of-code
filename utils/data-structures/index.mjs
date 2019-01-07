/* eslint-disable import/prefer-default-export */

export { default as Grid } from './Grid';

export const flatMap = (arr, callbackfn) => (
  arr.reduce((flattened, ...args) => (
    flattened.concat(callbackfn(...args))
  ), [])
);
