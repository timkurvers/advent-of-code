/* eslint-disable no-multi-spaces */

import {
  Graph,
  GraphVertex,
  Grid,
  astar,
  solution,
  sum,
} from '../../utils';

const Type = {
  EMPTY: '.',
  START: '@',
  WALL: '#',
};

const isStart = (value) => value === Type.START;
const isDoor = (value) => value >= 'A' && value <= 'Z';
const isKey = (value) => value >= 'a' && value <= 'z';
const keyForDoor = (door) => door.toLowerCase();

// Calculates bitmask for given key (a: 0b001, b: 0b010, c: 0b100 etc.)
const maskFor = (key) => 1 << (key.charCodeAt(0) - 'a'.charCodeAt(0));

const serialize = (state) => (
  `${state.index};${state.robots.map((loc) => loc.value).join(',')};${state.keys}`
);

const collect = (grid) => {
  // Generate a bitmask for all keys
  const allKeys = sum(grid.values.filter(isKey).map(maskFor));

  const isVertex = (point) => isStart(point.value) || isKey(point.value);

  // List of robot starting points
  const starts = [];

  // Construct a simplified graph from grid
  const graph = Graph.from(grid, {
    isVertex,
    vertexForPoint: (point, g) => {
      if (isStart(point.value)) {
        const vertex = new GraphVertex(starts.length + 1);
        starts.push(vertex);
        return vertex;
      }
      if (isKey(point.value)) {
        return g.lookup(point.value);
      }
      return null;
    },
    neighborsFor: (current) => (
      current.adjacentNeighbors.filter((point) => point.value !== Type.WALL)
    ),
  });

  // Augment edges with a bitmask of keys required along this path (if any)
  for (const edge of graph.edges) {
    edge.requirements = edge.path.reduce((mask, point) => {
      if (isDoor(point.value)) {
        return mask | maskFor(keyForDoor(point.value));
      }
      return mask;
    }, 0);
  }

  // State tracking robot locations, keys collected and robot move index
  const initial = {
    robots: starts, // Where the robots are
    keys: 0,
    index: null,
  };

  const cache = new Map();

  return astar(initial, null, {
    cost: (current, next) => {
      const { index } = next;
      const a = current.robots[index];
      const b = next.robots[index];
      return a.edge(b).cost;
    },
    done: (current) => current.keys === allKeys,
    nodesFor: (current) => {
      const { robots, keys } = current;

      const nodes = [];
      for (const [index, vertex] of robots.entries()) {
        for (const edge of vertex.edges) {
          const { requirements, to } = edge;

          // No need to visit start or pick up keys we already have multiple times
          if (to === starts[index] || keys & maskFor(to.value)) {
            continue;
          }

          // Ensure we have keys to open all doors along the edge
          if ((requirements & keys) !== requirements) {
            continue;
          }

          const nextRobots = robots.slice();
          nextRobots[index] = to;

          let next = {
            robots: nextRobots,
            keys: keys | maskFor(to.value),
            index,
          };

          const hash = serialize(next);
          next = cache.get(hash) || next;
          nodes.push(next);
          cache.set(hash, next);
        }
      }
      return nodes;
    },
  });
};

export const partOne = solution.inefficient((input) => {
  const grid = Grid.from(input);
  return collect(grid).score;
});

export const partTwo = solution.inefficient((input) => {
  const grid = Grid.from(input);
  const { center } = grid;
  const { left, right } = center;

  left.up.value   = '@'; center.up.value   = '#'; right.up.value   = '@';
  left.value      = '#'; center.value      = '#'; right.value      = '#';
  left.down.value = '@'; center.down.value = '#'; right.down.value = '@';

  return collect(grid).score;
});
