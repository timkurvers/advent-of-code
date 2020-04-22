import { BinaryHeap } from '..';

import Entry from './Entry';

// Loosely based on Python's PriorityQueue
// See: https://docs.python.org/3/library/queue.html#queue.PriorityQueue
class PriorityQueue extends BinaryHeap {
  constructor() {
    const compare = (a, b) => a.priority - b.priority;
    super(compare);
  }

  get() {
    const current = this.extract();
    if (!current) {
      return undefined;
    }
    return current.value;
  }

  peek() {
    const current = this.root;
    if (!current) {
      return undefined;
    }
    return current.value;
  }

  put(value, priority = 0) {
    const entry = new Entry(value, priority);
    this.insert(entry);
  }
}

PriorityQueue.prototype.pop = PriorityQueue.prototype.get;

export default PriorityQueue;
