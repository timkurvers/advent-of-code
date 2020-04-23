import {
  Graph,
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

const serialize = (state) => `${state.vertex.value}: ${state.keys}`;

const collect = (grid) => {
  // Generate a bitmask for all keys
  const allKeys = sum(grid.values.filter(isKey).map(maskFor));

  const isVertex = (point) => isStart(point.value) || isKey(point.value);

  const graph = Graph.from(grid, {
    isVertex,
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

  const start = graph.find(Type.START);

  const initial = { vertex: start, keys: 0 };

  const cache = new Map();

  return astar(initial, null, {
    cost: (current, next) => current.vertex.edgeTo(next.vertex).cost,
    done: (current) => current.keys === allKeys,
    nodesFor: (current) => {
      const { vertex, keys } = current;

      const nodes = [];
      for (const edge of vertex.edges) {
        const { requirements, to } = edge;

        // No need to visit start or pick up keys we already have multiple times
        if (to === start || keys & maskFor(to.value)) {
          continue;
        }

        // Ensure we have keys to open all doors along the edge
        if ((requirements & keys) !== requirements) {
          continue;
        }

        let next = { vertex: to, keys };
        next.keys |= maskFor(to.value);

        const hash = serialize(next);
        next = cache.get(hash) || next;
        nodes.push(next);
        cache.set(hash, next);
      }
      return nodes;
    },
  });
};

export const partOne = solution.inefficient((input) => {
  const grid = Grid.from(input);
  return collect(grid).score;
});
