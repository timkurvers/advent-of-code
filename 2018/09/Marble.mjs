/* eslint-disable no-param-reassign */

class Marble {
  constructor(id) {
    this.id = id;
    this.prev = this;
    this.next = this;
  }

  seek(offset) {
    let marble = this;
    const iters = Math.abs(offset);
    for (let i = 0; i < iters; ++i) {
      if (offset < 0) {
        marble = marble.prev;
      } else {
        marble = marble.next;
      }
    }
    return marble;
  }

  insertAt(a) {
    // From: A - B
    // To: A - this - B
    const b = a.next;
    a.next = this;
    this.prev = a;
    this.next = b;
    b.prev = this;
    return this;
  }

  remove() {
    // From: A - this - B
    // To: A - B
    const a = this.prev;
    const b = this.next;
    a.next = b;
    b.prev = a;
    this.prev = null;
    this.next = null;
    return this;
  }
}

export default Marble;
