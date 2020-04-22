import Entry from './Entry';

// Loosely based on Python's PriorityQueue
// See: https://docs.python.org/3/library/queue.html#queue.PriorityQueue
class PriorityQueue {
  constructor() {
    this.first = null;
  }

  get isEmpty() {
    return this.first === null;
  }

  get size() {
    let i = 0;
    let node = this.first;
    while (node) {
      ++i;
      node = node.next;
    }
    return i;
  }

  get() {
    const current = this.first;
    if (!current) {
      return undefined;
    }
    const { next } = current;
    current.remove();
    this.first = next;
    return current.value;
  }

  peek() {
    const current = this.first;
    if (!current) {
      return undefined;
    }
    return current.value;
  }

  put(value, priority = 0) {
    const entry = new Entry(value, priority);
    if (!this.first) {
      this.first = entry;
    } else {
      let node = this.first;
      let last = null;
      do {
        // Found correct priority position, prepend entry
        if (node.priority > priority) {
          node.prepend(entry);

          // Ensure first node is set correctly when changed
          if (node === this.first) {
            this.first = entry;
          }
          return;
        }

        last = node;
        node = node.next;
      } while (node);

      // Sought unsuccessfully through entire queue, add at the end
      last.append(entry);
    }
  }
}

PriorityQueue.prototype.pop = PriorityQueue.prototype.get;

export default PriorityQueue;
