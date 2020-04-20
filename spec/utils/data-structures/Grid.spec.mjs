/* eslint-disable object-curly-newline */

import { Grid, GridPoint, stripIndent } from '../../../utils';

describe('Grid', () => {
  describe('constructor', () => {
    it('creates an empty grid with default point class', () => {
      const grid = new Grid();
      expect(grid.pointClass).toBeInstanceOf(Function);
      expect(grid.width).toEqual(0);
      expect(grid.height).toEqual(0);
    });

    it('supports a custom point class', () => {
      class CustomPoint extends GridPoint {
        constructor(...args) {
          super(...args);
          this.custom = true;
        }
      }

      const grid = new Grid(CustomPoint);
      const value = Symbol();
      const point = grid.set(0, 0, value);
      expect(point).toEqual({
        x: 0,
        y: 0,
        value,
        custom: true,
      });
    });
  });

  describe('Point', () => {
    describe('constructor', () => {
      it('creates a new point for given grid, x and y', () => {
        const grid = new Grid();
        const x = 1;
        const y = 1;
        const value = Symbol();
        const point = new GridPoint(grid, x, y, value);
        expect(point.grid).toBe(grid);
        expect(point.x).toEqual(x);
        expect(point.y).toEqual(y);
        expect(point.value).toBe(value);
      });

      it('defaults x, y and value when omitted', () => {
        const point = new GridPoint();
        expect(point.x).toEqual(0);
        expect(point.y).toEqual(0);
        expect(point.value).toBeUndefined();
      });
    });

    describe('clone()', () => {
      it('clones this point', () => {
        const grid = new Grid();
        const value = Symbol();
        const point = new GridPoint(grid, 1, 1, value);
        const clone = point.clone();
        expect(clone).not.toBe(point);
        expect(clone.grid).toBe(grid);
        expect(clone.x).toEqual(1);
        expect(clone.y).toEqual(1);
        expect(clone.value).toBe(value);
      });
    });

    describe('distanceTo()', () => {
      it('calculates manhattan distance to given x and y', () => {
        const grid = new Grid();
        const point = new GridPoint(grid, 1, 1);
        expect(point.distanceTo(2, 2)).toEqual(2);
        expect(point.distanceTo(0, 0)).toEqual(2);
      });
    });

    describe('get adjacentNeighbors', () => {
      it('returns horizontally and vertically neighboring points (if any)', () => {
        const grid = Grid.from('ab\ncd');
        const [a, b, c] = grid.points;
        expect(a.adjacentNeighbors).toEqual([c, b]);
      });
    });

    describe('get neighbors', () => {
      it('returns neighboring points (if any) in all directions', () => {
        const grid = Grid.from('ab\ncd');
        const [a, b, c, d] = grid.points;
        expect(c.neighbors).toEqual([a, b, d]);
      });
    });

    describe('get label', () => {
      it('returns a human-readable label', () => {
        const grid = new Grid();
        const point = new GridPoint(grid, 1, 2);
        expect(point.label).toEqual('(2,1)');
      });
    });

    describe('get down', () => {
      it('returns point downwards (if any)', () => {
        const grid = Grid.from('a\nb');
        const [a, b] = grid.points;
        expect(a.down).toBe(b);
        expect(b.down).toBeUndefined();
      });
    });

    describe('get up', () => {
      it('returns point upwards (if any)', () => {
        const grid = Grid.from('a\nb');
        const [a, b] = grid.points;
        expect(a.up).toBeUndefined();
        expect(b.up).toBe(a);
      });
    });

    describe('get left', () => {
      it('returns point leftwards (if any)', () => {
        const grid = Grid.from('ab');
        const [a, b] = grid.points;
        expect(a.left).toBeUndefined();
        expect(b.left).toBe(a);
      });
    });

    describe('get right', () => {
      it('returns point rightwards (if any)', () => {
        const grid = Grid.from('ab');
        const [a, b] = grid.points;
        expect(a.right).toBe(b);
        expect(b.right).toBeUndefined();
      });
    });
  });

  describe('get center', () => {
    it('returns center point of grid', () => {
      const grid = new Grid();
      grid.set(0, 0);
      const b = grid.set(1, 1);
      const c = grid.set(2, 2);
      expect(grid.center).toBe(b);
      grid.set(3, 3);
      expect(grid.center).toBe(b);
      grid.set(4, 4);
      expect(grid.center).toBe(c);
    });
  });

  describe('get xs', () => {
    it('returns x indices', () => {
      const grid = new Grid();
      grid.set(0, 3);
      grid.set(4, 2);
      expect(grid.xs).toEqual([0, 4]);
    });
  });

  describe('get ys', () => {
    it('returns y indices', () => {
      const grid = new Grid();
      grid.set(0, 3);
      grid.set(4, 2);
      expect(grid.ys).toEqual([3, 2]);
    });
  });

  describe('get minX', () => {
    it('returns minimum x index', () => {
      const grid = new Grid();
      grid.set(0, 3);
      grid.set(4, 2);
      expect(grid.minX).toEqual(0);
    });

    it('returns undefined when grid is empty', () => {
      const grid = new Grid();
      expect(grid.minX).toEqual(undefined);
    });
  });

  describe('get maxX', () => {
    it('returns maximum x index', () => {
      const grid = new Grid();
      grid.set(0, 3);
      grid.set(4, 2);
      expect(grid.maxX).toEqual(4);
    });

    it('returns undefined when grid is empty', () => {
      const grid = new Grid();
      expect(grid.maxX).toEqual(undefined);
    });
  });

  describe('get minY', () => {
    it('returns minimum y index', () => {
      const grid = new Grid();
      grid.set(0, 3);
      grid.set(4, 2);
      expect(grid.minY).toEqual(2);
    });

    it('returns undefined when grid is empty', () => {
      const grid = new Grid();
      expect(grid.minY).toEqual(undefined);
    });
  });

  describe('get maxY', () => {
    it('returns maximum y index', () => {
      const grid = new Grid();
      grid.set(0, 3);
      grid.set(4, 2);
      expect(grid.maxY).toEqual(3);
    });

    it('returns undefined when grid is empty', () => {
      const grid = new Grid();
      expect(grid.maxY).toEqual(undefined);
    });
  });

  describe('get width', () => {
    it('returns implicit grid width (includes missing columns)', () => {
      const grid = new Grid();
      grid.set(0, 3);
      grid.set(4, 2);
      expect(grid.width).toEqual(5);
    });

    it('returns zero when grid is empty', () => {
      const grid = new Grid();
      expect(grid.width).toEqual(0);
    });
  });

  describe('get height', () => {
    it('returns implicit grid height (includes missing rows)', () => {
      const grid = new Grid();
      grid.set(0, 3);
      grid.set(4, 5);
      expect(grid.height).toEqual(3);
    });

    it('returns zero when grid is empty', () => {
      const grid = new Grid();
      expect(grid.height).toEqual(0);
    });
  });

  describe('get points', () => {
    it('returns an array of all points in grid', () => {
      const grid = new Grid();
      const a = grid.set(0, 0, 'a');
      const b = grid.set(2, 2, 'b');
      const c = grid.set(1, 1, 'c');
      expect(grid.points).toEqual([a, b, c]);
    });
  });

  describe('get values', () => {
    it('returns an array of all values in grid', () => {
      const grid = new Grid();
      grid.set(0, 0, 'a');
      grid.set(2, 2, 'b');
      grid.set(1, 1, 'c');
      expect(grid.values).toEqual(['a', 'b', 'c']);
    });
  });

  describe('iteration', () => {
    it('iterates over all points in grid', () => {
      const grid = new Grid();
      grid.set(0, 0, 'a');
      grid.set(1, 1, 'b');

      const collected = [];
      for (const point of grid) {
        collected.push(point.value);
      }

      expect(collected).toEqual(grid.values);
    });
  });

  describe('map()', () => {
    it('invokes given callback for each point and collects results', () => {
      const grid = new Grid();
      const a = grid.set(0, 0);
      const b = grid.set(1, 1);
      const mapped = grid.map((point, x, y) => [point, x, y]);
      expect(mapped).toEqual([
        [a, 0, 0],
        [b, 1, 1],
      ]);
    });
  });

  describe('fill()', () => {
    it('fills given area in grid with given value', () => {
      const grid = new Grid();
      const value = Symbol();
      grid.fill(0, 0, 1, 1, value);
      expect(grid.points).toEqual([
        { x: 0, y: 0, value },
        { x: 1, y: 0, value },
        { x: 0, y: 1, value },
        { x: 1, y: 1, value },
      ]);
    });
  });

  describe('filter()', () => {
    it('filters grid points by given condition', () => {
      const grid = new Grid();
      const a = grid.set(0, 0, 'a');
      const b = grid.set(1, 1, 'b');
      grid.set(2, 2, 'c');
      const filtered = grid.filter((point) => point.value < 'c');
      expect(filtered).toEqual([a, b]);
    });
  });

  describe('find()', () => {
    it('finds first point matching given condition', () => {
      const grid = new Grid();
      const a = grid.set(0, 0, 'a');
      grid.set(0, 1, 'b');
      const result = grid.find((point) => point.x === 0);
      expect(result).toBe(a);
    });

    it('returns null when no point matches given condition', () => {
      const grid = new Grid();
      grid.set(0, 0);
      const result = grid.find((point) => point.value === 'foo');
      expect(result).toBeNull();
    });
  });

  describe('get()', () => {
    it('returns value for point at given location', () => {
      const grid = new Grid();
      const value = Symbol();
      grid.set(0, 0, value);
      expect(grid.get(0, 0)).toBe(value);
    });

    it('returns undefined if point does not exist', () => {
      const grid = new Grid();
      expect(grid.get(0, 0)).toBeUndefined();
    });
  });

  describe('getPoint()', () => {
    it('returns point at given location', () => {
      const grid = new Grid();
      const point = grid.set(0, 0);
      expect(grid.getPoint(0, 0)).toBe(point);
    });

    it('returns undefined if point does not exist', () => {
      const grid = new Grid();
      expect(grid.getPoint(0, 0)).toBeUndefined();
    });
  });

  describe('set()', () => {
    it('creates and returns a point at given location with given value', () => {
      const grid = new Grid();
      const value = Symbol();
      const point = grid.set(0, 0, value);
      expect(point).toEqual({
        x: 0,
        y: 0,
        value,
      });
    });

    it('defaults to true as a value', () => {
      const grid = new Grid();
      const point = grid.set(0, 0);
      expect(point.value).toBe(true);
    });

    it('overwrites value for existing point', () => {
      const grid = new Grid();
      const original = grid.set(0, 0);
      const value = Symbol();
      const point = grid.set(0, 0, value);
      expect(point).toBe(original);
      expect(original.value).toBe(value);
    });
  });

  describe('column()', () => {
    it('returns all values in olumn by given index', () => {
      const grid = Grid.from(stripIndent`
        ab
        cd
      `);
      expect(grid.column(0)).toEqual(['a', 'c']);
    });
  });

  describe('row()', () => {
    it('returns all values in row by given index', () => {
      const grid = Grid.from(stripIndent`
        ab
        cd
      `);
      expect(grid.row(0)).toEqual(['a', 'b']);
    });
  });

  describe('toString()', () => {
    const source = stripIndent`
      a b
        c
        d
    `;
    const grid = Grid.from(source);

    it('returns string representation of grid', () => {
      expect(grid.toString()).toEqual(source);
    });

    it('supports custom renderer', () => {
      const result = grid.toString((point) => (
        point ? point.value : '?'
      ));
      expect(result).toEqual(stripIndent`
        a?b
        ??c
        ??d
      `);
    });
  });

  describe('static from()', () => {
    const source = stripIndent`
      a b
        d
    `;

    it('creates a grid from given gfx input string', () => {
      const grid = Grid.from(source);
      expect(grid.points).toEqual([
        { x: 0, y: 0, value: 'a' },
        { x: 2, y: 0, value: 'b' },
        { x: 2, y: 1, value: 'd' },
      ]);
    });

    it('supports including blanks', () => {
      const grid = Grid.from(source, {
        ignoreBlanks: false,
      });
      expect(grid.points).toEqual([
        { x: 0, y: 0, value: 'a' },
        { x: 1, y: 0, value: ' ' },
        { x: 2, y: 0, value: 'b' },
        { x: 0, y: 1, value: ' ' },
        { x: 1, y: 1, value: ' ' },
        { x: 2, y: 1, value: 'd' },
      ]);
    });

    it('supports a custom point class', () => {
      class CustomPoint extends GridPoint {
        constructor(...args) {
          super(...args);
          this.custom = true;
        }
      }

      const grid = Grid.from(source, {
        pointClass: CustomPoint,
      });
      expect(grid.points).toEqual([
        { x: 0, y: 0, value: 'a', custom: true },
        { x: 2, y: 0, value: 'b', custom: true },
        { x: 2, y: 1, value: 'd', custom: true },
      ]);
    });
  });
});
