/* eslint-disable object-curly-newline */

import { GridND, GridNDPoint, range, stripIndent } from '../../../utils';

describe('GridND', () => {
  const dimensions = ['x', 'y', 'z', 'w'];

  describe('constructor', () => {
    it('creates an empty grid of given dimensions and default point class', () => {
      const grid = new GridND(dimensions);
      expect(grid.dimensions).toEqual(dimensions);
      expect(grid.pointClass).toBeInstanceOf(Function);
      const point = grid.set([1, 2, 3, 4]);
      expect(point.x).toEqual(1);
      expect(point.y).toEqual(2);
      expect(point.z).toEqual(3);
      expect(point.w).toEqual(4);
    });

    it('supports a custom point class', () => {
      class CustomPoint extends GridNDPoint {
        constructor(...args) {
          super(...args);
          this.custom = true;
        }
      }

      const grid = new GridND(dimensions, { pointClass: CustomPoint });
      const value = Symbol();
      const point = grid.set([1, 1, 1, 1], value);
      expect(point).toEqual({
        position: [1, 1, 1, 1],
        value,
        custom: true,
      });
    });
  });

  describe('Point', () => {
    describe('constructor', () => {
      it('creates a new point for given grid, using given position', () => {
        const grid = new GridND(dimensions);
        const position = [0, 0, 0, 0];
        const value = Symbol();
        const point = new GridNDPoint(grid, position, value);
        expect(point.grid).toBe(grid);
        expect(point.position).toBe(position);
        expect(point.value).toBe(value);
      });

      it('defaults value when omitted', () => {
        const point = new GridNDPoint();
        expect(point.value).toBeUndefined();
      });
    });

    describe('clone()', () => {
      it('clones this point', () => {
        const grid = new GridND(dimensions);
        const value = Symbol();
        const position = [0, 0, 0, 0];
        const point = new GridNDPoint(grid, position, value);
        const clone = point.clone();
        expect(clone).not.toBe(point);
        expect(clone.grid).toBe(grid);
        expect(clone.position).toBe(position);
        expect(clone.value).toBe(value);
      });
    });

    describe('get neighbors', () => {
      it('returns neighboring points (if any) in all directions for all dimensions', () => {
        const grid = GridND.from(stripIndent`
          abc
          def
          ghi
        `, dimensions);
        const j = grid.set([1, 1, 1, 0], 'j');
        const k = grid.set([1, 1, -1, 0], 'k');

        const [a, b, c, d, e, f, g, h, i] = grid.points;
        expect(e.neighbors).toEqual(
          [a, d, g, b, k, j, h, c, f, i],
        );
      });
    });

    describe('get label', () => {
      it('returns a human-readable label', () => {
        const grid = new GridND(dimensions);
        const point = new GridNDPoint(grid, [1, 2, 3, 4]);
        expect(point.label).toEqual('(1,2,3,4)');
      });
    });

    describe('static for()', () => {
      it('generates a class with getter for given dimensions', () => {
        const CustomPoint = GridNDPoint.for(dimensions);
        const grid = new GridND(dimensions, { pointClass: CustomPoint });
        const point = grid.set([1, 2, 3, 4]);
        expect(point.x).toEqual(1);
        expect(point.y).toEqual(2);
        expect(point.z).toEqual(3);
        expect(point.w).toEqual(4);
        expect(() => {
          point.x = 1;
        }).toThrow();
      });
    });
  });

  describe('get numDimensions', () => {
    it('returns number of dimensions for this grid', () => {
      const grid = new GridND(dimensions);
      expect(grid.numDimensions).toEqual(4);
    });
  });

  describe('dimensionIndexFor()', () => {
    it('returns index for given dimension', () => {
      const grid = new GridND(dimensions);
      expect(grid.dimensionIndexFor(0)).toEqual(0);
      expect(grid.dimensionIndexFor('x')).toEqual(0);

      expect(grid.dimensionIndexFor(1)).toEqual(1);
      expect(grid.dimensionIndexFor('y')).toEqual(1);

      expect(grid.dimensionIndexFor(2)).toEqual(2);
      expect(grid.dimensionIndexFor('z')).toEqual(2);

      expect(grid.dimensionIndexFor(3)).toEqual(3);
      expect(grid.dimensionIndexFor('w')).toEqual(3);
    });
  });

  describe('positions()', () => {
    it('returns all position values for given dimension', () => {
      const grid = GridND.from(stripIndent`
        abc
        def
      `, dimensions);
      grid.set([1, 1, 2, 0]);

      expect(grid.positions(0)).toEqual([0, 1, 2]);
      expect(grid.positions('x')).toEqual([0, 1, 2]);

      expect(grid.positions(1)).toEqual([0, 1]);
      expect(grid.positions('y')).toEqual([0, 1]);

      expect(grid.positions(2)).toEqual([0, 2]);
      expect(grid.positions('z')).toEqual([0, 2]);

      expect(grid.positions(3)).toEqual([0]);
      expect(grid.positions('w')).toEqual([0]);
    });
  });

  describe('min()', () => {
    it('returns minimum position for given dimension', () => {
      const grid = new GridND(dimensions);
      grid.set([0, 3, 1, 1]);
      grid.set([4, 2, 1, -1]);

      expect(grid.min(0)).toEqual(0);
      expect(grid.min('x')).toEqual(0);

      expect(grid.min(1)).toEqual(2);
      expect(grid.min('y')).toEqual(2);

      expect(grid.min(2)).toEqual(1);
      expect(grid.min('z')).toEqual(1);

      expect(grid.min(3)).toEqual(-1);
      expect(grid.min('w')).toEqual(-1);
    });

    it('returns undefined when grid is empty', () => {
      const grid = new GridND(dimensions);
      expect(grid.min(0)).toEqual(undefined);
      expect(grid.min(1)).toEqual(undefined);
      expect(grid.min(2)).toEqual(undefined);
      expect(grid.min(3)).toEqual(undefined);
    });
  });

  describe('max()', () => {
    it('returns maximum position for given dimension', () => {
      const grid = new GridND(dimensions);
      grid.set([0, 3, 1, 1]);
      grid.set([4, 2, 1, -1]);

      expect(grid.max(0)).toEqual(4);
      expect(grid.max('x')).toEqual(4);

      expect(grid.max(1)).toEqual(3);
      expect(grid.max('y')).toEqual(3);

      expect(grid.max(2)).toEqual(1);
      expect(grid.max('z')).toEqual(1);

      expect(grid.max(3)).toEqual(1);
      expect(grid.max('w')).toEqual(1);
    });

    it('returns undefined when grid is empty', () => {
      const grid = new GridND(dimensions);
      expect(grid.max(0)).toEqual(undefined);
      expect(grid.max(1)).toEqual(undefined);
      expect(grid.max(2)).toEqual(undefined);
      expect(grid.max(3)).toEqual(undefined);
    });
  });

  describe('get size', () => {
    it('returns implicit grid size for given dimension (includes missing positions)', () => {
      const grid = new GridND(dimensions);
      grid.set([0, 3, 1, 1]);
      grid.set([4, 2, 1, -1]);

      expect(grid.size(0)).toEqual(5);
      expect(grid.size('x')).toEqual(5);

      expect(grid.size(1)).toEqual(2);
      expect(grid.size('y')).toEqual(2);

      expect(grid.size(2)).toEqual(1);
      expect(grid.size('z')).toEqual(1);

      expect(grid.size(3)).toEqual(3);
      expect(grid.size('w')).toEqual(3);
    });

    it('returns zero when grid is empty', () => {
      const grid = new GridND(dimensions);
      expect(grid.size(0)).toEqual(0);
      expect(grid.size(1)).toEqual(0);
      expect(grid.size(2)).toEqual(0);
      expect(grid.size(3)).toEqual(0);
    });
  });

  describe('get points', () => {
    it('returns an array of all points in grid', () => {
      const grid = new GridND(dimensions);
      const a = grid.set([0, 0, 0, 0], 'a');
      const b = grid.set([2, 2, 0, 0], 'b');
      const c = grid.set([1, 1, 0, 0], 'c');
      expect(grid.points).toEqual([a, b, c]);
    });
  });

  describe('get values', () => {
    it('returns an array of all values in grid', () => {
      const grid = new GridND(dimensions);
      grid.set([0, 0, 0, 0], 'a');
      grid.set([2, 2, 0, 0], 'b');
      grid.set([1, 1, 0, 0], 'c');
      expect(grid.values).toEqual(['a', 'b', 'c']);
    });
  });

  describe('iteration', () => {
    it('iterates over all points in grid', () => {
      const grid = new GridND(dimensions);
      grid.set([0, 0, 0, 0], 'a');
      grid.set([2, 2, 0, 0], 'b');

      const collected = [];
      for (const point of grid) {
        collected.push(point.value);
      }

      expect(collected).toEqual(grid.values);
    });
  });

  describe('map()', () => {
    it('invokes given callback for each point and collects results', () => {
      const grid = new GridND(dimensions);
      const a = grid.set([0, 0, 0, 0], 'a');
      const b = grid.set([2, 2, 0, 0], 'b');
      const mapped = grid.map((point, position) => [point, position]);
      expect(mapped).toEqual([
        [a, [0, 0, 0, 0]],
        [b, [2, 2, 0, 0]],
      ]);
    });
  });

  describe('fill()', () => {
    it('fills given boundary for each dimension in grid with given value', () => {
      const grid = new GridND(dimensions);
      const value = Symbol();

      const boundaries = [
        { min: 0, max: 2 },
        { min: 0, max: 1 },
        { min: 1, max: 1 },
        { min: 0, max: 0 },
      ];

      grid.fill(boundaries, value);
      expect(grid.points).toEqual([
        { position: [0, 0, 1, 0], value },
        { position: [0, 1, 1, 0], value },
        { position: [1, 0, 1, 0], value },
        { position: [1, 1, 1, 0], value },
        { position: [2, 0, 1, 0], value },
        { position: [2, 1, 1, 0], value },
      ]);
    });
  });

  describe('filter()', () => {
    it('filters grid points by given condition', () => {
      const grid = new GridND(dimensions);
      const a = grid.set([0, 0, 0, 0], 'a');
      const b = grid.set([1, 1, 0, 0], 'b');
      grid.set([2, 2, 0, 0], 'c');
      const filtered = grid.filter((point) => point.value < 'c');
      expect(filtered).toEqual([a, b]);
    });
  });

  describe('find()', () => {
    it('finds first point matching given condition', () => {
      const grid = new GridND(dimensions);
      const a = grid.set([0, 0, 0, 0], 'a');
      grid.set([0, 1, 0, 0], 'b');
      const result = grid.find((point) => point.position[0] === 0);
      expect(result).toBe(a);
    });

    it('returns null when no point matches given condition', () => {
      const grid = new GridND(dimensions);
      grid.set([0, 0, 0, 0]);
      const result = grid.find((point) => point.value === 'foo');
      expect(result).toBeNull();
    });
  });

  describe('get()', () => {
    it('returns value for point at given position', () => {
      const grid = new GridND(dimensions);
      const value = Symbol();
      grid.set([0, 0, 0, 0], value);
      expect(grid.get([0, 0, 0, 0])).toBe(value);
    });

    it('returns undefined if point does not exist', () => {
      const grid = new GridND(dimensions);
      expect(grid.get([0, 0, 0, 0])).toBeUndefined();
    });
  });

  describe('getPoint()', () => {
    it('returns point at given position', () => {
      const grid = new GridND(dimensions);
      const point = grid.set([0, 0, 0, 0]);
      expect(grid.getPoint([0, 0, 0, 0])).toBe(point);
    });

    it('returns undefined if point does not exist', () => {
      const grid = new GridND(dimensions);
      expect(grid.getPoint([0, 0, 0, 0])).toBeUndefined();
    });
  });

  describe('remove()', () => {
    it('removes and returns point at given location', () => {
      const grid = new GridND(dimensions);
      const point = grid.set([0, 0, 0, 0]);
      expect(grid.remove([0, 0, 0, 0])).toBe(point);
      expect(grid.getPoint([0, 0, 0, 0])).toBeUndefined();
    });

    it('returns undefined if point does not exist', () => {
      const grid = new GridND(dimensions);
      expect(grid.remove([0, 0, 0, 0])).toBeUndefined();
    });
  });

  describe('pad()', () => {
    it('pads grid in all dimensions with given padding', () => {
      const numDimensions = [1, 2, 3, 4, 5];
      for (const num of numDimensions) {
        const grid = new GridND(range({ length: num }).map((n) => `dim${n}`));

        // Start off with one point
        grid.set(new Array(num).fill(0));
        expect(grid.points.length).toEqual(1 ** num);

        // Two additional positions (each direction) for each dimension
        grid.pad(1);
        expect(grid.points.length).toEqual((1 + 2 * 1) ** num);
        grid.pad(1);
        expect(grid.points.length).toEqual((1 + 2 * 2) ** num);
        grid.pad(1);
        expect(grid.points.length).toEqual((1 + 2 * 3) ** num);
      }
    });

    it('pads using value given or default if omitted', () => {
      const grid = new GridND(dimensions);
      grid.set([0, 0, 0, 0]);
      const value = Symbol();
      grid.pad(1, value);
      expect(grid.get([-1, -1, -1, -1])).toBe(value);

      grid.pad(1);
      expect(grid.get([-2, -2, -2, -2])).toBe(true);
    });
  });

  describe('set()', () => {
    it('creates and returns a point at given position with given value', () => {
      const grid = new GridND(dimensions);
      const value = Symbol();
      const point = grid.set([0, 0, 0, 0], value);
      expect(point).toEqual({
        position: [0, 0, 0, 0],
        value,
      });
    });

    it('defaults to true as a value', () => {
      const grid = new GridND(dimensions);
      const point = grid.set([0, 0, 0, 0]);
      expect(point.value).toBe(true);
    });

    it('overwrites value for existing point', () => {
      const grid = new GridND(dimensions);
      const original = grid.set([0, 0, 0, 0]);
      const value = Symbol();
      const point = grid.set([0, 0, 0, 0], value);
      expect(point).toBe(original);
      expect(original.value).toBe(value);
    });
  });

  describe('toString()', () => {
    const source = stripIndent`
      a b
        c
        d
    `;
    const grid = GridND.from(source, dimensions);

    it('returns string representation of grid using given descriptor', () => {
      expect(grid.toString({ z: 0, w: 0 })).toEqual(source);
      expect(grid.toString({ z: 1, w: 0 })).toEqual('   \n   \n   \n');
    });

    it('supports custom renderer', () => {
      const result = grid.toString({ z: 0, w: 0 }, (point) => (
        point ? point.value : '?'
      ));
      expect(result).toEqual(stripIndent`
        a?b
        ??c
        ??d
      `);
    });

    it('allows omitting descriptor, defaulting to 0 for other axes', () => {
      expect(grid.toString()).toEqual(source);
    });
  });

  describe('static from()', () => {
    const source = stripIndent`
      a b
        d
    `;

    it('creates a grid from given gfx input string', () => {
      const grid = GridND.from(source, dimensions);
      expect(grid.points).toEqual([
        { position: [0, 0, 0, 0], value: 'a' },
        { position: [2, 0, 0, 0], value: 'b' },
        { position: [2, 1, 0, 0], value: 'd' },
      ]);
    });

    it('supports including blanks', () => {
      const grid = GridND.from(source, dimensions, {
        ignoreBlanks: false,
      });
      expect(grid.points).toEqual([
        { position: [0, 0, 0, 0], value: 'a' },
        { position: [1, 0, 0, 0], value: ' ' },
        { position: [2, 0, 0, 0], value: 'b' },
        { position: [0, 1, 0, 0], value: ' ' },
        { position: [1, 1, 0, 0], value: ' ' },
        { position: [2, 1, 0, 0], value: 'd' },
      ]);
    });

    it('supports a custom point class', () => {
      class CustomPoint extends GridNDPoint {
        constructor(...args) {
          super(...args);
          this.custom = true;
        }
      }

      const grid = GridND.from(source, dimensions, {
        pointClass: CustomPoint,
      });
      expect(grid.points).toEqual([
        { position: [0, 0, 0, 0], value: 'a', custom: true },
        { position: [2, 0, 0, 0], value: 'b', custom: true },
        { position: [2, 1, 0, 0], value: 'd', custom: true },
      ]);
    });
  });
});
