/* eslint-disable no-cond-assign, no-param-reassign */

import { Graph, reduceMaxBy, solution } from '../../utils';

const parse = (input) => input.trim().split('\n').map(Number).sort((a, b) => a - b);

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
  const connectorsFor = (joltage) => (
    entries.filter((entry) => joltage >= entry - 3 && joltage < entry)
  );

  // Creates a graph with the outlet, adapters and device as vertices
  const graph = new Graph();
  const { vertices } = graph;
  for (const entry of entries) {
    for (const connector of connectorsFor(entry)) {
      graph.edge(entry, connector);
    }
  }

  // Walks between given vertices, calculating the unique number of paths
  const walk = ({ from, to }) => {
    let paths = 0;
    const frontier = [from];
    let current = null;
    while (current = frontier.pop()) {
      if (current === to) {
        ++paths;
        continue;
      }
      for (const edge of current.edges) {
        frontier.push(edge.to);
      }
    }
    return paths;
  };

  const start = vertices[0];
  const goal = vertices[vertices.length - 1];

  // Iterating over this graph to find all possible paths is not feasible, so
  // chop the graph into segments and multiply the paths together
  let paths = 1;
  let current = start;
  while (current !== goal) {
    const { edges } = current;

    // Current segment can extend as this vertex only has one path forward
    if (edges.length === 1) {
      current = edges[0].to;
      continue;
    }

    // Encountered a split in the path, find all jump targets and the vertex
    // where all these variations rejoin the main path
    const targets = edges.flatMap((e) => e.to.edges.map((n) => n.to));
    const rejoin = reduceMaxBy(targets, 'value');

    // Multiply current paths by those for the newly discovered segment
    paths *= walk({ from: current, to: rejoin });
    current = rejoin;
  }

  return paths;
});
