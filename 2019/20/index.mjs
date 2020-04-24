import {
  Graph,
  GraphVertex,
  Grid,
  astar,
  solution,
} from '../../utils';

const Type = {
  EMPTY: '.',
};

const OUTER_RING_SIZE = 3;

const directions = ['up', 'down', 'left', 'right'];

const isEmpty = (point) => point.value === Type.EMPTY;
const isLetter = (point) => point && point.value >= 'A' && point.value <= 'Z';
const isPortal = (point) => (
  isEmpty(point) && point.adjacentNeighbors.some(isLetter)
);
const isPassable = (point) => isEmpty(point) || isPortal(point);

const prepare = (input) => {
  const grid = Grid.from(input);
  const { maxX, maxY } = grid;

  const graph = Graph.from(grid, {
    neighborsFor: (current) => current.adjacentNeighbors.filter(isPassable),
    vertexForPoint: (point) => {
      // Only interested in converting portals to vertices
      if (!isPortal(point)) {
        return null;
      }

      // Extract the portal's label from the grid (AA, BC etc.)
      let value;
      for (const dir of directions) {
        if (point[dir] && isLetter(point[dir])) {
          value = [point[dir].value, point[dir][dir].value].sort().join('');
          break;
        }
      }

      // Rather than using graph.lookup() which would treat each end of a portal
      // as the same vertex, instantiate a vertex manually ensuring two vertices
      // per portal (one for entry and one for exit)
      const vertex = new GraphVertex(value);
      vertex.point = point;

      // Whether this portal is on the outer ring of the maze
      vertex.outer = (
        point.x < OUTER_RING_SIZE
        || point.y < OUTER_RING_SIZE
        || maxX - point.x < OUTER_RING_SIZE
        || maxY - point.y < OUTER_RING_SIZE
      );

      return vertex;
    },
  });

  // Link matching portal vertices, costing one step to use the portal
  for (const a of graph.vertices) {
    const b = graph.find((other) => other.value === a.value && other !== a);
    if (b) {
      graph.edge(a, b, { cost: 1 });
    }
  }

  return graph;
};

const travel = (graph, { recursiveSpaces = false } = {}) => {
  const start = graph.find('AA');
  const goal = graph.find('ZZ');

  // Whether given portal can be used at the given level
  const isActive = (portal, level) => {
    if (!recursiveSpaces || !portal.outer) {
      return true;
    }
    if (portal === start || portal === goal) {
      return level === 0;
    }
    return level !== 0;
  };

  const serialize = (state) => `${state.vertex.point.label}@${state.level}`;

  const initial = { vertex: start, level: 0 };

  const cache = new Map();

  return astar(initial, null, {
    cost: (current, next) => current.vertex.edge(next.vertex).cost,
    done: (current) => (
      current.vertex === goal && (!recursiveSpaces || current.level === 0)
    ),
    nodesFor: (current) => {
      const { vertex } = current;
      let { level } = current;

      const nodes = [];
      for (const edge of vertex.edges) {
        // Ensure portals may be used, and if so, adjust the level accordingly
        if (vertex.value === edge.to.value) {
          if (!isActive(vertex, level)) {
            continue;
          }
          level += vertex.outer ? -1 : +1;
        }

        let next = { vertex: edge.to, level };
        const hash = serialize(next);
        next = cache.get(hash) || next;
        nodes.push(next);
        cache.set(hash, next);
      }

      return nodes;
    },
  });
};

export const partOne = solution((input) => {
  const graph = prepare(input);
  const result = travel(graph);
  return result.score;
});

export const partTwo = solution((input) => {
  const graph = prepare(input);
  const result = travel(graph, { recursiveSpaces: true });
  return result.score;
});
