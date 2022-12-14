/* eslint-disable no-cond-assign */

import { Grid, solution } from '../../utils';

const POINT_MATCHER = /(?<x>\d+),(?<y>\d+)/g;

const ROCK = '#';
const SAND = 'O';
const SOURCE = '+';

const parse = (input) => {
  const cave = new Grid();

  for (const line of input.trim().split('\n')) {
    let previous;
    for (const point of line.matchAll(POINT_MATCHER)) {
      const tx = +point.groups.x;
      const ty = +point.groups.y;

      if (previous) {
        let { x, y } = previous;
        const dx = x === tx ? 0 : Math.sign(tx - x);
        const dy = y === ty ? 0 : Math.sign(ty - y);

        cave.set(x, y, ROCK);
        do {
          x += dx;
          y += dy;
          cave.set(x, y, ROCK);
        } while (x !== tx || y !== ty);
      }

      previous = { x: tx, y: ty };
    }
  }

  return cave;
};

const simulate = (cave, { floor, until }) => {
  const source = cave.set(500, 0, SOURCE);
  const floorY = cave.maxY + 2;

  const grain = () => {
    const sand = { x: source.x, y: source.y };
    do {
      const onFloor = floor && sand.y + 1 === floorY;
      if (onFloor) {
        cave.set(sand.x, sand.y, SAND);
        return sand;
      }

      const down = cave.get(sand.x, sand.y + 1);
      if (!down) {
        sand.y += 1;
        continue;
      }

      const downLeft = cave.get(sand.x - 1, sand.y + 1);
      if (!downLeft) {
        sand.x -= 1;
        sand.y += 1;
        continue;
      }

      const downRight = cave.get(sand.x + 1, sand.y + 1);
      if (!downRight) {
        sand.x += 1;
        sand.y += 1;
        continue;
      }

      cave.set(sand.x, sand.y, SAND);
      return sand;
    } while (!until(sand, source));
    return null;
  };

  let count = 0;
  while (source.value === SOURCE && grain()) {
    ++count;
  }

  return count;
};

export const partOne = solution((input) => {
  const cave = parse(input);
  const { maxY } = cave;

  const fallingIntoAbyss = (sand) => sand.y > maxY;
  return simulate(cave, { until: fallingIntoAbyss });
});

export const partTwo = solution((input) => {
  const cave = parse(input);

  const blockingSource = (sand, source) => sand.x === source.x && sand.y === source.y;
  return simulate(cave, { floor: true, until: blockingSource });
});
