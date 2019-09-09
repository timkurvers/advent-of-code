/* eslint-disable no-param-reassign */

import Node from './Node';

class CircularLinkedList {
  static toArray(start) {
    const values = [];
    let node = start;
    do {
      values.push(node.value);
      node = node.next;
    } while (node !== start);
    return values;
  }

  static from(values) {
    let root;
    let current;
    for (const value of values) {
      const node = new Node(value);
      if (!root) {
        root = node;
      }
      if (current) {
        current.append(node);
      }
      current = node;
    }
    return root;
  }
}

export { Node as LinkedListNode };
export { CircularLinkedList };
