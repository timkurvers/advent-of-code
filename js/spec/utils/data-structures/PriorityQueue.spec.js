import { PriorityQueue, time } from '../../../src/utils/index.js';

describe('PriorityQueue', () => {
  describe('constructor', () => {
    it('creates an initially empty priority queue', () => {
      const queue = new PriorityQueue();
      expect(queue.size).toEqual(0);
      expect(queue.peek()).toBeUndefined();
    });
  });

  describe('get isEmpty', () => {
    it('returns whether the queue is empty', () => {
      const queue = new PriorityQueue();
      expect(queue.isEmpty).toBe(true);

      queue.put('foo', 1);
      queue.put('bar', 2);
      expect(queue.isEmpty).toBe(false);

      queue.get();
      expect(queue.isEmpty).toBe(false);

      queue.get();
      expect(queue.isEmpty).toBe(true);
    });
  });

  describe('get size', () => {
    it('returns size of the queue', () => {
      const queue = new PriorityQueue();
      expect(queue.size).toEqual(0);

      queue.put('foo', 1);
      queue.put('bar', 2);

      expect(queue.size).toEqual(2);

      queue.get();
      expect(queue.size).toEqual(1);

      queue.get();
      expect(queue.size).toEqual(0);
    });
  });

  describe('get()', () => {
    it('removes first entry from the queue and returns its value', () => {
      const queue = new PriorityQueue();

      const foo = Symbol();
      const bar = Symbol();
      queue.put(bar, 2);
      queue.put(foo, 1);
      expect(queue.get()).toBe(foo);
      expect(queue.get()).toBe(bar);

      expect(queue.peek()).toBeUndefined();
    });

    it('returns undefined if the queue is empty', () => {
      const queue = new PriorityQueue();
      expect(queue.get()).toBeUndefined();
    });
  });

  describe('pop()', () => {
    it('is an alias for get()', () => {
      const queue = new PriorityQueue();
      expect(queue.pop).toBe(queue.get);
    });
  });

  describe('peek()', () => {
    it('returns value of the first entry of the queue', () => {
      const queue = new PriorityQueue();

      const foo = Symbol();
      const bar = Symbol();
      queue.put(bar, 2);
      queue.put(foo, 1);
      expect(queue.peek()).toBe(foo);
      expect(queue.peek()).toBe(foo);
    });

    it('returns undefined if the queue is empty', () => {
      const queue = new PriorityQueue();
      expect(queue.peek()).toBeUndefined();
    });
  });

  describe('put()', () => {
    it('puts given value into the queue with given priority, returns entry', () => {
      const queue = new PriorityQueue();

      const foo = Symbol();
      let entry = queue.put(foo, 2);
      expect(entry.value).toBe(foo);
      expect(entry.priority).toEqual(2);
      expect(queue.peek()).toBe(foo);

      const bar = Symbol();
      entry = queue.put(bar, 1);
      expect(entry.value).toBe(bar);
      expect(entry.priority).toEqual(1);
      expect(queue.peek()).toBe(bar);
    });

    it('defaults priority when omitted', () => {
      const queue = new PriorityQueue();
      const foo = Symbol();
      const entry = queue.put(foo);
      expect(entry.value).toBe(foo);
      expect(entry.priority).toEqual(0);
    });

    it('can process a large amount of entries within a second', async () => {
      const count = 100000;

      const build = () => {
        const queue = new PriorityQueue();
        for (let i = 0; i < count; ++i) {
          queue.put(i, i);
        }
        return queue;
      };

      const [duration, queue] = await time(build);
      expect(duration).toBeLessThan(1000);
      expect(queue.size).toEqual(count);
    });
  });
});
