/* eslint-disable no-param-reassign */

import { sum } from '../../utils';

let ord = 65;

class Node {
  constructor() {
    this.id = String.fromCharCode(ord++);

    this.children = [];
    this.metadata = [];
  }

  get value() {
    if (!this.children.length) {
      return this.metadataSum;
    }

    return sum(this.metadata.map((ref) => (
      this.children[ref - 1] ? this.children[ref - 1].value : 0
    )));
  }

  get metadataSum() {
    return sum(this.metadata);
  }

  static parse(data, context) {
    const numChildren = data[context.offset++];
    const numMetadata = data[context.offset++];

    const node = new this();
    const { children, metadata } = node;

    while (children.length < numChildren) {
      children.push(this.parse(data, context));
    }

    while (metadata.length < numMetadata) {
      metadata.push(+data[context.offset++]);
    }

    context.nodes.push(node);
    return node;
  }
}

export default Node;
