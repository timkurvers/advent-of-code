import { Queue } from '../../../utils';

describe('Queue', () => {
  describe('constructor', () => {
    it('creates an initially empty queue', () => {
      const queue = new Queue();
      expect(queue.tail).toBeNull();
      expect(queue.head).toBeNull();
    });
  });

  describe('get isEmpty', () => {
    it('returns whether the queue is empty', () => {
      const queue = new Queue();
      expect(queue.isEmpty).toBe(true);

      queue.enqueue('foo');
      queue.enqueue('bar');
      expect(queue.isEmpty).toBe(false);

      queue.dequeue();
      expect(queue.isEmpty).toBe(false);

      queue.dequeue();
      expect(queue.isEmpty).toBe(true);
    });
  });

  describe('get size', () => {
    it('returns size of the queue', () => {
      const queue = new Queue();
      expect(queue.size).toEqual(0);

      queue.enqueue('foo');
      queue.enqueue('bar');

      expect(queue.size).toEqual(2);

      queue.dequeue();
      expect(queue.size).toEqual(1);

      queue.dequeue();
      expect(queue.size).toEqual(0);
    });
  });

  describe('enqueue()', () => {
    it('enqueues given value onto tail of the queue', () => {
      const queue = new Queue();

      const foo = Symbol();
      queue.enqueue(foo);
      expect(queue.tail.value).toBe(foo);

      const bar = Symbol();
      queue.enqueue(bar);
      expect(queue.tail.value).toBe(bar);
    });
  });

  describe('dequeue()', () => {
    it('dequeues head of the queue and returns its value', () => {
      const queue = new Queue();

      const foo = Symbol();
      const bar = Symbol();
      queue.enqueue(foo);
      queue.enqueue(bar);
      expect(queue.dequeue()).toBe(foo);
      expect(queue.dequeue()).toBe(bar);

      expect(queue.head).toBeNull();
      expect(queue.tail).toBeNull();
    });

    it('returns undefined if the queue is empty', () => {
      const queue = new Queue();
      expect(queue.dequeue()).toBeUndefined();
    });
  });

  describe('peek()', () => {
    it('returns value of the head of the queue', () => {
      const queue = new Queue();

      const foo = Symbol();
      const bar = Symbol();
      queue.enqueue(foo);
      queue.enqueue(bar);
      expect(queue.peek()).toBe(foo);
      expect(queue.peek()).toBe(foo);
    });

    it('returns undefined if the queue is empty', () => {
      const queue = new Queue();
      expect(queue.peek()).toBeUndefined();
    });
  });
});
