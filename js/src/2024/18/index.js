import { Grid, astar, bisect, solution } from '../../utils/index.js';

const EMPTY = '.';
const CORRUPTED = '#';

const isEmpty = (point) => point.value === EMPTY;

const parse = (input) =>
  input
    .trim()
    .split('\n')
    .map((line) => line.split(',').map(Number));

const simulate = (bytes, size) => {
  const memspace = new Grid();
  memspace.fill(0, 0, size, size, EMPTY);
  for (const [x, y] of bytes) {
    memspace.set(x, y, CORRUPTED);
  }
  return memspace;
};

const speedrun = (memspace, size) => {
  const start = memspace.getPoint(0, 0);
  const goal = memspace.getPoint(size, size);

  return astar(start, goal, {
    neighborsFor: (current) => current.adjacentNeighbors.filter(isEmpty),
  });
};

export const partOne = solution((input, { size = 70, numBytes = 1024 }) => {
  const bytes = parse(input).slice(0, numBytes);
  const memspace = simulate(bytes, size);
  return speedrun(memspace, size).score;
});

export const partTwo = solution(async (input, { size = 70 }) => {
  const bytes = parse(input);

  const result = await bisect({
    lower: 1,
    upper: bytes.length,
    until: (index) => {
      const memspace = simulate(bytes.slice(0, index), size);
      const candidate = speedrun(memspace, size);
      return !candidate;
    },
  });

  return bytes[result - 1].join(',');
});
