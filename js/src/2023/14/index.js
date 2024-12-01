import { Grid, solution, sum } from '../../utils/index.js';

const ROCK = 'O';
const BLOCK = '#';
const EMPTY = '.';

const parse = (input) => Grid.from(input.trim());

const isRock = (point) => point.value === ROCK;

// Tilts platform north
const tilt = (platform) => {
  const { minX, maxX, minY, maxY } = platform;

  for (let x = minX; x <= maxX; ++x) {
    let target = null;
    for (let y = minY; y <= maxY; ++y) {
      const current = platform.getPoint(x, y);

      if (current.value === ROCK) {
        if (target && target.value === EMPTY) {
          target.value = ROCK;
          current.value = EMPTY;
          target = target.down;
        }
      } else if (current.value === BLOCK) {
        target = current.down;
      } else if (current.value === EMPTY) {
        if (!target || target.value !== EMPTY) {
          target = current;
        }
      }
    }
  }
};

export const partOne = solution((input) => {
  const platform = parse(input);
  tilt(platform);

  const rocks = platform.filter(isRock);
  return sum(rocks.map((rock) => platform.maxY - rock.y + 1));
});

export const partTwo = solution.inefficient((input) => {
  const platform = parse(input);
  const { maxY } = platform;

  const cycle = () => {
    // North
    tilt(platform);

    // West
    platform.rotate();
    tilt(platform);
    platform.rotate();
    platform.rotate();
    platform.rotate();

    // South
    platform.rotate();
    platform.rotate();
    tilt(platform);
    platform.rotate();
    platform.rotate();

    // East
    platform.rotate();
    platform.rotate();
    platform.rotate();
    tilt(platform);
    platform.rotate();
  };

  let round = 1;
  let length;
  const seen = {};
  while (true) {
    const hash = platform.toString();
    if (hash in seen) {
      length = round - seen[hash];
      break;
    }
    seen[hash] = round;
    cycle();
    ++round;
  }

  const target = 1000000000;
  const remainder = (target - round + 1) % length;
  for (let i = 0; i < remainder; ++i) {
    cycle();
  }

  const rocks = platform.filter(isRock);
  return sum(rocks.map((rock) => maxY - rock.y + 1));
});
