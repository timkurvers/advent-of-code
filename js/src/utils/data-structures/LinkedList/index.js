import Node from './Node.js';

class LinkedList {
  static toArray(start) {
    const nodes = [];
    let node = start;
    do {
      nodes.push(node);
      node = node.next;
    } while (node && node !== start);
    return nodes;
  }

  static toValuesArray(start) {
    const values = [];
    let node = start;
    do {
      values.push(node.value);
      node = node.next;
    } while (node && node !== start);
    return values;
  }

  static from(values, { nodeClass: NodeClass = Node } = {}) {
    let root;
    let current;
    for (const value of values) {
      const node = new NodeClass(value);
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

export default LinkedList;
export { Node as LinkedListNode };
