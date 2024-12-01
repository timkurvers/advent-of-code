import { Grid, astar, bfs, stripIndent } from '../../src/utils/index.js';

describe('pathfinding utilities', () => {
  const grid = Grid.from(stripIndent`
    S...
    ?##X
    ?...
    ?##.
    .G..
  `);

  const start = grid.find((point) => point.value === 'S');
  const goal = grid.find((point) => point.value === 'G');

  const isPassable = (point) => point.value !== '#';
  const isUnknown = (point) => point.value === '?';
  const neighborsFor = (point) => point.adjacentNeighbors.filter(isPassable);

  // From S to G
  const path = [
    start,
    grid.getPoint(0, 1),
    grid.getPoint(0, 2),
    grid.getPoint(0, 3),
    grid.getPoint(0, 4),
    goal,
  ];

  // From S to G ignoring ?s
  const longPath = [
    start,
    grid.getPoint(1, 0),
    grid.getPoint(2, 0),
    grid.getPoint(3, 0),
    grid.getPoint(3, 1),
    grid.getPoint(3, 2),
    grid.getPoint(3, 3),
    grid.getPoint(3, 4),
    grid.getPoint(2, 4),
    goal,
  ];

  // From S to X
  const pathX = [start, grid.getPoint(1, 0), grid.getPoint(2, 0), grid.getPoint(3, 0), grid.getPoint(3, 1)];

  describe('astar()', () => {
    it('returns shortest path with its score', () => {
      const result = astar(start, goal, {
        neighborsFor,
      });
      expect(result).toEqual({ path, score: 5 });
    });

    it('supports custom cost calculation', () => {
      const result = astar(start, goal, {
        cost: (point) => (isUnknown(point) ? Infinity : 1),
        neighborsFor,
      });
      expect(result).toEqual({ path: longPath, score: 9 });
    });

    it('supports custom done condition', () => {
      const result = astar(start, null, {
        done: (point) => point.value === 'X',
        neighborsFor,
      });
      expect(result).toEqual({ path: pathX, score: 4 });
    });

    it('supports a heuristic', () => {
      const result = astar(start, goal, {
        heuristic: (point) => (isUnknown(point) ? Infinity : 0),
        neighborsFor,
      });
      expect(result).toEqual({ path: longPath, score: 9 });
    });

    it('supports nodesFor as an alternative to neighborsFor', () => {
      const result = astar(start, goal, {
        nodesFor: neighborsFor,
      });
      expect(result).toEqual({ path, score: 5 });
    });

    it('returns null if no path to goal exists', () => {
      const fake = Symbol();
      const result = astar(start, fake, {
        neighborsFor,
      });
      expect(result).toBeNull();
    });
  });

  describe('bfs()', () => {
    it('returns shortest path as well as list of visited nodes', () => {
      const result = bfs(start, goal, {
        neighborsFor,
      });
      expect(result.path).toEqual(path);
      expect(result.visited).toBeInstanceOf(Set);
      expect(result.visited.size).toEqual(13);
    });

    it('supports custom done condition', () => {
      const result = bfs(start, null, {
        done: (point) => point.value === 'X',
        neighborsFor,
      });
      expect(result.path).toEqual(pathX);
      expect(result.visited).toBeInstanceOf(Set);
      expect(result.visited.size).toEqual(13);
    });

    it('supports nodesFor as an alternative to neighborsFor', () => {
      const result = bfs(start, goal, {
        nodesFor: neighborsFor,
      });
      expect(result.path).toEqual(path);
      expect(result.visited).toBeInstanceOf(Set);
      expect(result.visited.size).toEqual(13);
    });

    it('omits path if none to goal exists', () => {
      const fake = Symbol();
      const result = bfs(start, fake, {
        neighborsFor,
      });
      expect(result.path).toEqual(null);
      expect(result.visited).toBeInstanceOf(Set);
      expect(result.visited.size).toEqual(16);
    });
  });
});
