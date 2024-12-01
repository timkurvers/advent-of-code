/* eslint-disable no-cond-assign */

import { Graph, solution } from '../../utils/index.js';

const parse = (input) => {
  const routes = input
    .trim()
    .split('\n')
    .map((line) => line.split('-'));
  const graph = new Graph();
  for (const [a, b] of routes) {
    graph.link(a, b);
  }

  const start = graph.lookup('start');
  const end = graph.lookup('end');

  for (const vertex of graph.vertices) {
    vertex.isRevisitable = vertex.value.toUpperCase() === vertex.value;
  }

  return { graph, start, end };
};

export const partOne = solution((input) => {
  const { start, end } = parse(input);

  let paths = 0;
  const frontier = [{ location: start, path: [start] }];
  let current = null;
  while ((current = frontier.pop())) {
    const { location, path } = current;
    if (location === end) {
      ++paths;
      continue;
    }

    for (const edge of location.edges) {
      const visited = path.indexOf(edge.to) !== -1;
      if (visited && !edge.to.isRevisitable) {
        continue;
      }
      frontier.push({ location: edge.to, path: [...path, edge.to] });
    }
  }
  return paths;
});

export const partTwo = solution((input) => {
  const { start, end } = parse(input);

  let paths = 0;
  const frontier = [
    {
      location: start,
      path: [start],
      revisited: null,
    },
  ];
  let current = null;
  while ((current = frontier.pop())) {
    const { location, path } = current;
    if (location === end) {
      ++paths;
      continue;
    }

    for (const edge of location.edges) {
      if (edge.to === start) continue;

      let { revisited } = current;
      const visited = path.indexOf(edge.to) !== -1;
      if (visited && !edge.to.isRevisitable) {
        if (revisited) {
          continue;
        }
        revisited = edge.to;
      }
      frontier.push({
        location: edge.to,
        path: [...path, edge.to],
        revisited,
      });
    }
  }
  return paths;
});
