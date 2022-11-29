import { CircularLinkedList, CircularLinkedListNode } from '../../../src/utils';

describe('CircularLinkedList', () => {
  describe('Node', () => {
    describe('constructor', () => {
      it('is circular', () => {
        const node = new CircularLinkedListNode();
        expect(node.prev).toBe(node);
        expect(node.next).toBe(node);
      });
    });
  });

  describe('static from()', () => {
    it('creates a linked list of given values', () => {
      const values = ['a', 'b', 'c'];
      const root = CircularLinkedList.from(values);
      const [a, b, c] = CircularLinkedList.toArray(root);
      expect(a).toEqual({
        value: 'a',
        prev: c,
        next: b,
      });
      expect(b).toEqual({
        value: 'b',
        prev: a,
        next: c,
      });
      expect(c).toEqual({
        value: 'c',
        prev: b,
        next: a,
      });
    });

    it('supports a custom node class', () => {
      class CustomNode extends CircularLinkedListNode {
        constructor(...args) {
          super(...args);
          this.custom = true;
        }
      }

      const values = ['a', 'b'];
      const root = CircularLinkedList.from(values, { nodeClass: CustomNode });
      const [a, b] = CircularLinkedList.toArray(root);
      expect(a).toEqual({
        value: 'a',
        custom: true,
        prev: b,
        next: b,
      });
      expect(b).toEqual({
        value: 'b',
        custom: true,
        prev: a,
        next: a,
      });
    });
  });
});
