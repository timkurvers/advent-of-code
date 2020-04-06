import { LinkedListNode } from '.';

class Queue {
  constructor() {
    this.tail = null;
    this.head = null;
  }

  get isEmpty() {
    return this.head === null;
  }

  enqueue(value) {
    const node = new LinkedListNode(value);
    if (!this.tail) {
      this.tail = node;
      this.head = this.tail;
    } else {
      this.tail.prepend(node);
      this.tail = node;
    }
    return node;
  }

  dequeue() {
    const current = this.head;
    if (!current) {
      return undefined;
    }
    const head = this.head.prev || null;
    if (head) {
      head.next = null;
    }
    this.head = head;
    if (this.tail === current) {
      this.tail = null;
    }
    return current.value;
  }

  peek() {
    const current = this.head;
    return current && current.value;
  }
}

export default Queue;
