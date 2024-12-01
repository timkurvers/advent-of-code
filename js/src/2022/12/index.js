import { Grid, astar, solution } from '../../utils/index.js';

const parse = (input) => {
  const grid = Grid.from(input);
  const start = grid.find((p) => p.value === 'S');
  const goal = grid.find((p) => p.value === 'E');
  start.value = 'a';
  goal.value = 'z';
  return { grid, start, goal };
};

const elevationAt = (letter) => letter.charCodeAt(0) - 96;

const canMove = (from, to) => {
  const cost = elevationAt(to.value) - elevationAt(from.value);
  return cost <= 1;
};

const navigate = (start, goal) => (
  astar(start, goal, {
    neighborsFor: (current) => {
      const neighbors = current.adjacentNeighbors;
      return neighbors.filter((next) => canMove(current, next));
    },
  })
);

export const partOne = solution((input) => {
  const { start, goal } = parse(input);
  const result = navigate(start, goal);
  return result.score;
});

export const partTwo = solution((input) => {
  const { grid, goal } = parse(input);
  const candidates = grid.filter((p) => p.value === 'a');

  let best;
  for (const start of candidates) {
    const result = navigate(start, goal);

    // Some candidate squares do not connect to the goal
    if (result && (!best || result.score < best.score)) {
      best = result;
    }
  }
  return best.score;
});
