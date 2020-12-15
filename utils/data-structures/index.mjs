/* eslint-disable no-param-reassign */

export { default as BinaryHeap } from './BinaryHeap';
export { default as Cache } from './Cache';
export { default as CircularLinkedList, CircularLinkedListNode } from './CircularLinkedList';
export { default as LinkedList, LinkedListNode } from './LinkedList';
export { default as Graph, GraphEdge, GraphVertex } from './Graph';
export { default as Grid, GridPoint } from './Grid';
export { default as PriorityQueue } from './PriorityQueue';
export { default as Queue } from './Queue';

// Shuffles given array in-place
// See: https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
export const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const range = ({ start = 0, end, length = end + 1 - start }) => (
  new Array(length).fill(0).map((_, index) => start + index)
);

export const wrap = (index, length) => {
  const maxIndex = length - 1;
  if (index < 0) {
    return maxIndex - (Math.abs(index + 1) % length);
  }
  return index % length;
};

export const zip = (first, ...arrays) => (
  first.map((value, i) => (
    arrays.reduce((zipped, current) => [...zipped, current[i]], [value])
  ))
);
