export { CircularLinkedList, LinkedListNode } from './LinkedList';
export { default as Grid, GridPoint } from './Grid';

export const flatMap = (arr, callbackfn) => (
  arr.reduce((flattened, ...args) => (
    flattened.concat(callbackfn(...args))
  ), [])
);
