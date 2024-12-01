import { Grid, astar, bfs, solution, stripIndent } from '../../utils/index.js';

import Point from './Point/index.js';

const build = () => {
  const definition = stripIndent`
    S...
    ....
    ....
    ...V
  `;

  const grid = Grid.from(definition, { pointClass: Point });
  const start = grid.find((p) => p.value === 'S');
  const goal = grid.find((p) => p.value === 'V');
  return { grid, start, goal };
};

export const partOne = solution((passcode) => {
  const { start, goal } = build();

  const { path: route } = astar(start.withPath(), null, {
    neighborsFor: (current) => current.options(passcode),
    done: (current) => current.point === goal,
    heuristic: (next) => next.point.distanceToPoint(goal),
  });
  const last = route[route.length - 1];
  return last.path;
});

export const partTwo = solution((passcode) => {
  const { start, goal } = build();

  const { visited } = bfs(start.withPath(), null, {
    neighborsFor: (current) =>
      // Limit problem space by not traversing past the goal
      current.point === goal ? [] : current.options(passcode),
  });

  return Array.from(visited).reduce((target, current) => {
    if (current.point === goal && current.path.length > target) {
      return current.path.length;
    }
    return target;
  }, -Infinity);
});
