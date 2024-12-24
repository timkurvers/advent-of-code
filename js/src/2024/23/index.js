import { Graph, bfs, solution } from '../../utils/index.js';

const parse = (input) => {
  const graph = new Graph();
  for (const line of input.trim().split('\n')) {
    const [a, b] = line.split('-');
    graph.link(a, b, { cost: 1 });
  }
  return graph;
};

const clusterize = (graph) => {
  const clusters = new Map();

  const hash = (vertices) =>
    vertices
      .map((v) => v.value)
      .sort()
      .join('-');

  for (const computer of graph.vertices) {
    for (const { to: other } of computer.edges) {
      const results = bfs(other, computer, {
        done: (current, _goal, path) => current === computer && path.length === 3,
        maxCost: 2,
        nodesFor: (current) => current.edges.map((edge) => edge.to),
      });

      for (const result of results) {
        clusters.set(hash(result.path), result.path);
      }
    }
  }

  return Array.from(clusters.values());
};

const startsWithT = (vertex) => vertex.value.startsWith('t');

export const partOne = solution((input) => {
  const graph = parse(input);
  const clusters = clusterize(graph);
  return clusters.reduce((sum, cluster) => sum + cluster.some(startsWithT), 0);
});

// TODO: Ain't nobody got time for part two ;)
