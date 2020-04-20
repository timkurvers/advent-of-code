import { LinkedList, LinkedListNode } from '../../../utils';

describe('LinkedList', () => {
  describe('Node', () => {
    describe('constructor', () => {
      it('creates an initially unlinked node with given value', () => {
        const value = Symbol();
        const node = new LinkedListNode(value);
        expect(node.next).toBe(null);
        expect(node.prev).toBe(null);
        expect(node.value).toBe(value);
      });
    });

    describe('seek()', () => {
      const [a, b, c] = LinkedList.toArray(LinkedList.from(['a', 'b', 'c']));

      it('seeks forwards when given a positive offset', () => {
        expect(a.seek(2)).toBe(c);
      });

      it('does not seek when given a zero offset', () => {
        expect(a.seek(0)).toBe(a);
      });

      it('seeks backwards when given a negative offset', () => {
        expect(a.seek(2).seek(-1)).toBe(b);
      });

      it('returns head or tail when seeking out of bounds', () => {
        expect(a.seek(-2)).toBe(a);
        expect(c.seek(2)).toBe(c);
      });
    });

    describe('append()', () => {
      it('appends given node after current node', () => {
        const [a, c] = LinkedList.toArray(LinkedList.from(['a', 'c']));
        const b = new LinkedListNode('b');
        a.append(b);
        expect(a).toEqual({
          value: 'a',
          prev: null,
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
          next: null,
        });
      });

      it('returns current node', () => {
        const a = new LinkedListNode('a');
        const b = new LinkedListNode('b');
        expect(a.append(b)).toBe(a);
      });
    });

    describe('prepend()', () => {
      it('prepends given node before current node', () => {
        const [a, c] = LinkedList.toArray(LinkedList.from(['a', 'c']));
        const b = new LinkedListNode('b');
        c.prepend(b);
        expect(a).toEqual({
          value: 'a',
          prev: null,
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
          next: null,
        });
      });

      it('returns current node', () => {
        const a = new LinkedListNode('a');
        const b = new LinkedListNode('b');
        expect(a.prepend(b)).toBe(a);
      });
    });

    describe('remove()', () => {
      it('removes current node from linked list', () => {
        const [a, b, c] = LinkedList.toArray(LinkedList.from(['a', 'b', 'c']));
        b.remove();
        expect(a).toEqual({
          value: 'a',
          prev: null,
          next: c,
        });
        expect(c).toEqual({
          value: 'c',
          prev: a,
          next: null,
        });
        expect(b).toEqual({
          value: 'b',
          prev: null,
          next: null,
        });
      });

      it('returns current node', () => {
        const node = new LinkedListNode('node');
        expect(node.remove()).toBe(node);
      });
    });
  });

  describe('static toArray()', () => {
    it('returns all nodes in this linked list as an array', () => {
      const root = LinkedList.from(['a', 'b', 'c']);
      expect(LinkedList.toArray(root)).toEqual([
        root,
        root.seek(1),
        root.seek(2),
      ]);
    });
  });

  describe('static toValuesArray()', () => {
    it('returns all values in this linked list as an array', () => {
      const values = ['a', 'b', 'c'];
      const root = LinkedList.from(values);
      expect(LinkedList.toValuesArray(root)).toEqual(values);
    });
  });

  describe('static from()', () => {
    it('creates a linked list of given values', () => {
      const values = ['a', 'b', 'c'];
      const root = LinkedList.from(values);
      const [a, b, c] = LinkedList.toArray(root);
      expect(a).toEqual({
        value: 'a',
        prev: null,
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
        next: null,
      });
    });

    it('supports a custom node class', () => {
      class CustomNode extends LinkedListNode {
        constructor(...args) {
          super(...args);
          this.custom = true;
        }
      }

      const values = ['a', 'b'];
      const root = LinkedList.from(values, { nodeClass: CustomNode });
      const [a, b] = LinkedList.toArray(root);
      expect(a).toEqual({
        value: 'a',
        custom: true,
        prev: null,
        next: b,
      });
      expect(b).toEqual({
        value: 'b',
        custom: true,
        prev: a,
        next: null,
      });
    });
  });
});
