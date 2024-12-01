/* eslint-disable consistent-return */

import { Cache, Graph, Grid, astar, solution } from '../../utils/index.js';

const parse = (input) => Grid.from(input);

const GridType = {
  EMPTY: '.',
  WALL: '#',
};

const PodType = {
  A: { column: 3, energyPerStep: 1 },
  B: { column: 5, energyPerStep: 10 },
  C: { column: 7, energyPerStep: 100 },
  D: { column: 9, energyPerStep: 1000 },
};

const isStart = (point) => point.value >= 'A' && point.value <= 'D';
const isHallway = (point) => point.value === GridType.EMPTY;
const isRestSpot = (point) => isHallway(point) && !isStart(point.down);

const homeFor = (point) => {
  for (const [type, { column }] of Object.entries(PodType)) {
    if (point.x === column) {
      return type;
    }
  }
};

const serialize = (state) => `${state.index};${state.pods.map((loc) => loc.value).join(',')}`;

const assemble = (grid) => {
  // Holds amphipod types and their starting points
  const podTypes = [];
  const podStarts = [];

  // Holds target rooms by type (e.g. A => [A1, A2], B => [B1, B2] etc.)
  const rooms = new Cache({ init: () => [] });

  const graph = Graph.from(grid, {
    isValidEdge: ({ vertex: a }, { vertex: b }) => {
      // Disallow movement between rest points in hallway
      if (a.isRestSpot && b.isRestSpot) {
        return false;
      }

      // Disallow movement within a target room of a single type
      if (a.isTarget && b.isTarget && a.homeFor === b.homeFor) {
        return false;
      }

      return true;
    },
    vertexForPoint: (point, g) => {
      // Create a named vertex (A1, A2, B1 etc.) for every start/target location,
      // tagged with the type of amphipod that calls this target home
      if (isStart(point)) {
        const type = homeFor(point);
        const depth = point.y - 1;
        const vertex = g.lookup(`${type}${depth}`);
        vertex.depth = depth;
        vertex.homeFor = type;
        vertex.isTarget = true;
        vertex.point = point;
        rooms.lookup(type).push(vertex);

        // In addition, a pod starts in this spot
        podTypes.push(point.value);
        podStarts.push(vertex);

        return vertex;
      }

      // Create a vertex for every rest spot in the hallway (spots that are NOT
      // in front of a target room)
      if (isRestSpot(point)) {
        const vertex = g.lookup(`R${point.x}`);
        vertex.isRestSpot = true;
        vertex.point = point;
        return vertex;
      }

      return null;
    },
    neighborsFor: (current) => current.adjacentNeighbors.filter((point) => point.value !== GridType.WALL),
  });

  // Whether pod at given index is at home at given vertex
  const isHome = (loc, index) => loc.homeFor === podTypes[index];

  // State tracking pod locations and pod move index
  const initial = {
    pods: podStarts,
    index: null,
  };

  const cache = new Cache({ hash: serialize });

  const result = astar(initial, null, {
    cost: (current, next) => {
      const { index } = next;
      const a = current.pods[index];
      const b = next.pods[index];
      const type = podTypes[index];
      return a.edge(b).cost * PodType[type].energyPerStep;
    },
    done: (current) => current.pods.every(isHome),
    heuristic: (current) =>
      current.pods.reduce((total, from, index) => {
        const type = podTypes[index];
        const target = graph.lookup(`${type}1`);
        const estimate = from.point.distanceToPoint(target.point);
        return total + estimate * PodType[type].energyPerStep;
      }, 0),
    nodesFor: (current) => {
      const { pods } = current;

      // List of currently obstructed points in the grid
      const obstructed = pods.map((vertex) => vertex.point);

      const nodes = [];
      for (const [index, from] of pods.entries()) {
        const type = podTypes[index];

        // Prevent moving out of correct target room
        if (from.isTarget && from.homeFor === type) {
          // If all spots deeper into room are of correct type (with no gaps)
          if (
            rooms.lookup(type).every((other) => {
              if (other.depth <= from.depth) {
                return true;
              }
              const oindex = pods.findIndex((v) => v === other);
              return podTypes[oindex] === type;
            })
          ) {
            continue;
          }
        }

        for (const edge of from.edges) {
          const { to } = edge;

          // Disallow movement into target rooms of different types
          if (to.isTarget && to.homeFor !== type) {
            continue;
          }

          // Disallow movement when points along the path are obstructed
          if (edge.path.some((point, i) => i !== 0 && obstructed.includes(point))) {
            continue;
          }

          // Prevent movement when target room is occupied by different type
          if (to.isTarget && to.homeFor === type) {
            if (
              rooms.lookup(type).some((other) => {
                if (other.depth <= to.depth) {
                  return false;
                }
                const oindex = pods.findIndex((v) => v === other);
                return podTypes[oindex] !== type;
              })
            ) {
              continue;
            }
          }

          const nextPods = pods.slice();
          nextPods[index] = to;

          const next = cache.lookup({
            pods: nextPods,
            index,
          });

          // Forced movement into a target room
          if (to.isTarget) {
            nodes.length = 0;
            nodes.push(next);
            break;
          } else {
            nodes.push(next);
          }
        }
      }

      return nodes;
    },
  });

  return result;
};

export const partOne = solution((input) => {
  const grid = parse(input);
  const result = assemble(grid);
  return result.score;
});

export const partTwo = solution.inefficient((input) => {
  const unfolded = input.split('\n');
  unfolded.splice(3, 0, '  #D#C#B#A#', '  #D#B#A#C#');
  const grid = parse(unfolded.join('\n'));
  const result = assemble(grid);
  return result.score;
});
