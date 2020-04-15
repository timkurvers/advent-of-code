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

  // Appends given node after current node
  // Example: A - C with A.append(B) becomes A - B - C
  append(node) {
    if (this.next) {
      this.next.prev = node;
    }
    node.next = this.next;
    this.next = node;
    node.prev = this;
  }

  // Prepends given node before this node
  // Example: A - C with C.prepend(B) becomes A - B - C
  prepend(node) {
    if (this.prev) {
      this.prev.next = node;
    }
    node.prev = this.prev;
    this.prev = node;
    node.next = this;
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
