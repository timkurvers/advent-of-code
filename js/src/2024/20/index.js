import { Grid, astar, solution } from '../../utils/index.js';

const WALL = '#';

const isPassable = (point) => point.value !== WALL;

const directions = ['up', 'down', 'left', 'right'];

const parse = (input) => {
  const track = Grid.from(input);
  const start = track.find((point) => point.value === 'S');
  const end = track.find((point) => point.value === 'E');
  return { track, start, end };
};

const traverse = ({ start, end }) => {
  const result = astar(start, null, {
    done: (current) => current === end,
    neighborsFor: (current) => current.adjacentNeighbors.filter(isPassable),
  });
  return result;
};

export const partOne = solution.inefficient((input, { minSavings = 100 }) => {
  const { start, end } = parse(input);

  const honest = traverse({ start, end });
  const target = honest.score - minSavings;

  let count = 0;
  for (const enter of honest.path) {
    for (const dir of directions) {
      const phase = enter[dir];
      if (!phase || isPassable(phase)) continue;

      const exit = phase[dir];
      if (!exit || !isPassable(exit)) continue;

      const first = traverse({ start, end: enter });
      const second = traverse({ start: exit, end });
      const score = first.score + 2 + second.score;

      if (score <= target) {
        ++count;
      }
    }
  }
  return count;
});

// TODO: Ain't nobody got time for part two ;)
