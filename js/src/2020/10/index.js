import { Graph, solution } from '../../utils/index.js';

const parse = (input) =>
  input
    .trim()
    .split('\n')
    .map(Number)
    .sort((a, b) => a - b);

// Prepares a list of entries, prepending charging outlet (0) and appending the
// adapter of device (highest-rated adapter + 3)
const prepare = (adapters) => {
  const outlet = 0;
  const device = Math.max(...adapters) + 3;
  return [outlet, ...adapters, device];
};

export const partOne = solution((input) => {
  const adapters = parse(input);
  const entries = prepare(adapters);

  const diffs = entries.reduce((list, current, index, array) => {
    if (index !== 0) {
      list.push(current - array[index - 1]);
    }
    return list;
  }, []);

  const ones = diffs.filter((diff) => diff === 1).length;
  const threes = diffs.filter((diff) => diff === 3).length;
  return ones * threes;
});

export const partTwo = solution((input) => {
  const adapters = parse(input);
  const entries = prepare(adapters);

  // Finds valid connectors for given joltage
  const connectorsFor = (joltage) => entries.filter((entry) => joltage >= entry - 3 && joltage < entry);

  // Creates a graph with the outlet, adapters and device as vertices
  // Note: Probably faster without the graph, but graphs are cool <3
  const graph = new Graph();
  const { vertices } = graph;
  for (const entry of entries) {
    for (const connector of connectorsFor(entry)) {
      graph.edge(entry, connector);
    }
  }

  // Augment all vertices with the number of paths it can be reached by
  const start = vertices[0];
  start.paths = 1;
  for (const vertex of vertices) {
    const { edges, paths } = vertex;
    for (const edge of edges) {
      edge.to.paths = (edge.to.paths || 0) + paths;
    }
  }

  const goal = vertices[vertices.length - 1];
  return goal.paths;
});
