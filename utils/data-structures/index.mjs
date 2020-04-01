export { default as Cache } from './Cache';
export { default as CircularLinkedList, CircularLinkedListNode } from './CircularLinkedList';
export { default as LinkedList, LinkedListNode } from './LinkedList';
export { default as Graph, GraphEdge, GraphVertex } from './Graph';
export { default as Grid, GridPoint } from './Grid';
export { default as PriorityQueue } from './PriorityQueue';

export const flatMap = (arr, callbackfn) => (
  arr.reduce((flattened, ...args) => (
    flattened.concat(callbackfn(...args))
  ), [])
);

export const range = ({ start = 0, end, length = end + 1 - start } = {}) => (
  new Array(length).fill(0).map((_, index) => start + index)
);

export const wrap = (index, length) => {
  const maxIndex = length - 1;
  if (index < 0) {
    return maxIndex - (Math.abs(index + 1) % length);
  }
  return index % length;
};
