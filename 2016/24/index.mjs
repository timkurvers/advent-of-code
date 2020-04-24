import {
  Graph,
  Grid,
  permute,
  reduceMinBy,
  solution,
} from '../../utils';

const Type = {
  EMPTY: '.',
  WALL: '#',
};

const travel = (route) => {
  const { length } = route;

  let steps = 0;
  for (let i = 0; i < length - 1; i++) {
    const a = route[i];
    const b = route[i + 1];
    steps += a.edge(b).cost;
  }

  return steps;
};

const prepare = (input) => {
  const grid = Grid.from(input);

  const isVertex = (point) => (
    point.value !== Type.EMPTY && point.value !== Type.WALL
  );

  const graph = Graph.from(grid, {
    isVertex,
    neighborsFor: (current) => (
      current.adjacentNeighbors.filter((point) => point.value !== Type.WALL)
    ),
  });

  const start = graph.find('0');

  // Consider all routes starting with location 0
  const routes = Array.from(permute(graph.vertices)).filter((route) => (
    route[0] === start
  ));

  return { graph, routes, start };
};

export const partOne = solution((input) => {
  const { routes } = prepare(input);

  const candidates = routes.map((route) => ({
    steps: travel(route),
    route,
  }));

  return reduceMinBy(candidates, 'steps').steps;
});

export const partTwo = solution((input) => {
  const { routes, start } = prepare(input);

  const candidates = routes.map((route) => {
    const round = route.concat(start);
    return {
      steps: travel(round),
      route: round,
    };
  });

  return reduceMinBy(candidates, 'steps').steps;
});
