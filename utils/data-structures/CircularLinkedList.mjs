import LinkedList, { LinkedListNode } from './LinkedList';

class Node extends LinkedListNode {
  constructor(...args) {
    super(...args);
    this.prev = this;
    this.next = this;
  }
}

class CircularLinkedList extends LinkedList {
  static from(values, { nodeClass = Node } = {}) {
    return super.from(values, { nodeClass });
  }
}

export default CircularLinkedList;
export { Node as CircularLinkedListNode };
