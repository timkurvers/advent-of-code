/* eslint-disable no-loop-func */

import { mod, multiply, solution } from '../../utils/index.js';

const SIGNED_NUMBER_MATCHER = /-?\d+/g;

const parse = (input) =>
  input
    .trim()
    .split('\n')
    .map((line) => {
      const [px, py, dx, dy] = Array.from(line.matchAll(SIGNED_NUMBER_MATCHER)).map((match) =>
        Number(match[0]),
      );
      return { px, py, dx, dy };
    });

const predict = (robot, steps, width, height) => {
  const px = mod(robot.px + steps * robot.dx, width);
  const py = mod(robot.py + steps * robot.dy, height);
  return { px, py };
};

// Whether given robot is within radial distance 1 of other robot
const isNearOther = (robot, other) => {
  const diffx = Math.abs(robot.px - other.px);
  const diffy = Math.abs(robot.py - other.py);
  return robot !== other && diffx <= 1 && diffy <= 1;
};

// Whether this configuration of robots visually contains a hidden Christmas tree (!)
// Note: uses an arbitrary cluster threshold, as Erik sneakily decided to not let _all_ robots contribute
const isChristmasTree = (robots, threshold = 0.75) => {
  const total = robots.length;
  const clustered = robots.reduce((sum, robot) => sum + robots.some((other) => isNearOther(robot, other)), 0);
  const percent = clustered / total;
  return percent >= threshold;
};

export const partOne = solution((input, { width = 101, height = 103 }) => {
  const robots = parse(input);

  const middlex = (width / 2) | 0;
  const middley = (height / 2) | 0;

  const steps = 100;

  const quadrants = [0, 0, 0, 0];

  for (const robot of robots) {
    const { px, py } = predict(robot, steps, width, height);
    const inMiddle = px === middlex || py === middley;
    if (!inMiddle) {
      const index = ((((py - 1) / middley) | 0) << 1) | (((px - 1) / middlex) | 0);
      quadrants[index]++;
    }
  }

  return multiply(quadrants);
});

export const partTwo = solution.inefficient((input, { width = 101, height = 103 }) => {
  const robots = parse(input);

  let steps = 1;
  while (true) {
    const snapshot = robots.map((robot) => predict(robot, steps, width, height));
    if (isChristmasTree(snapshot)) {
      break;
    }
    ++steps;
  }

  return steps;
});
