export { CircularLinkedList, LinkedListNode } from './LinkedList';
export { default as Grid } from './Grid';
export { default as Point } from './Point';

export const flatMap = (arr, callbackfn) => (
  arr.reduce((flattened, ...args) => (
    flattened.concat(callbackfn(...args))
  ), [])
);
