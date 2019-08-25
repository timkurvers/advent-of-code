/* eslint-disable no-param-reassign */

class Node {
  constructor(value) {
    this.value = value;
    this.prev = this;
    this.next = this;
  }

  seek(offset) {
    let node = this;
    const count = Math.abs(offset);
    const direction = offset > 0 ? 'next' : 'prev';
    for (let i = 0; i < count; ++i) {
      node = node[direction];
    }
    return node;
  }

  append(node) {
    this.next.prev = node;
    node.next = this.next;
    this.next = node;
    node.prev = this;
  }

  prepend(node) {
    this.prev.next = node;
    node.next = this;
    this.prev = node;
    node.next = this;
  }

  remove() {
    this.prev.next = this.next;
    this.next.prev = this.prev;
    this.next = null;
    this.prev = null;
  }
}

export default Node;
