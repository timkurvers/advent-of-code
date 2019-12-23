import LinkedListNode from '../LinkedList/Node';

class Entry extends LinkedListNode {
  constructor(value, priority) {
    super(value);
    this.priority = priority;
  }
}

export default Entry;
