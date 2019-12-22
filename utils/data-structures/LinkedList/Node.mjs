/* eslint-disable no-param-reassign */

class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }

  seek(offset) {
    let node = this;
    const count = Math.abs(offset);
    const direction = offset > 0 ? 'next' : 'prev';
    for (let i = 0; i < count; ++i) {
      node = node[direction] || node;
    }
    return node;
  }

  append(node) {
    if (this.next) {
      this.next.prev = node;
    }
    node.next = this.next;
    this.next = node;
    node.prev = this;
  }

  prepend(node) {
    if (this.prev) {
      this.prev.next = node;
    }
    node.next = this;
    this.prev = node;
  }

  remove() {
    if (this.prev) {
      this.prev.next = this.next;
    }
    if (this.next) {
      this.next.prev = this.prev;
    }
    this.next = null;
    this.prev = null;
  }
}

export default Node;
