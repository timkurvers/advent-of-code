export { CircularLinkedList, LinkedListNode } from './LinkedList';
export { default as Grid, GridPoint } from './Grid';

export const flatMap = (arr, callbackfn) => (
  arr.reduce((flattened, ...args) => (
    flattened.concat(callbackfn(...args))
  ), [])
);

export const wrap = (index, length) => {
  const maxIndex = length - 1;
  if (index < 0) {
    return maxIndex - (Math.abs(index + 1) % length);
  }
  return index % length;
};
