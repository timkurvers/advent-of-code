/* eslint-disable no-param-reassign */

export { default as BinaryHeap } from './BinaryHeap.js';
export { default as Cache } from './Cache.js';
export { default as CircularLinkedList, CircularLinkedListNode } from './CircularLinkedList.js';
export { default as LinkedList, LinkedListNode } from './LinkedList/index.js';
export { default as Graph, GraphEdge, GraphVertex } from './Graph/index.js';
export { default as Grid, GridPoint } from './Grid/index.js';
export { default as GridND, GridNDPoint } from './GridND/index.js';
export { default as PriorityQueue } from './PriorityQueue/index.js';
export { default as Queue } from './Queue.js';

export const intersection = (first, ...arrays) =>
  first.reduce((list, entry) => {
    if (arrays.every((array) => array.includes(entry))) {
      list.push(entry);
    }
    return list;
  }, []);

export const range = ({ start = 0, end, length = end + 1 - start }) =>
  new Array(length).fill(0).map((_, index) => start + index);

// Shuffles given array in-place
// See: https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
export const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const wrap = (index, length) => {
  const maxIndex = length - 1;
  if (index < 0) {
    return maxIndex - (Math.abs(index + 1) % length);
  }
  return index % length;
};

export const zip = (first, ...arrays) =>
  first.map((value, i) => arrays.reduce((zipped, current) => [...zipped, current[i]], [value]));
