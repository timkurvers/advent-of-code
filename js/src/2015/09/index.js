import { Graph, permute, reduceMaxBy, reduceMinBy, solution } from '../../utils/index.js';

const DISTANCE_MATCHER = /(\w+) to (\w+) = (\d+)/g;

const parse = (input) => {
  const graph = new Graph();
  for (const match of input.matchAll(DISTANCE_MATCHER)) {
    const [, a, b, distance] = match;
    graph.link(a, b, { cost: +distance });
  }
  return graph;
};

const distanceFor = (route) =>
  route.reduce((distance, current, index) => {
    const next = route[index + 1];
    if (next) {
      const edge = current.edges.find((e) => e.to === next);
      return distance + edge.cost;
    }
    return distance;
  }, 0);

const plan = (input) => {
  const graph = parse(input);
  const routes = permute(graph.vertices);
  return Array.from(routes).map((route) => ({
    distance: distanceFor(route),
    route,
  }));
};

export const partOne = solution((input) => {
  const routes = plan(input);
  return reduceMinBy(routes, 'distance').distance;
});

export const partTwo = solution((input) => {
  const routes = plan(input);
  return reduceMaxBy(routes, 'distance').distance;
});
