/* eslint-disable object-curly-newline */

import { Grid, solution, sum } from '../../utils';

const INSTRUCTION_MATCHER = /(on|off|toggle) (\d+),(\d+) through (\d+),(\d+)/;

const parse = input => input.split('\n').map((line) => {
  const [, op, fromX, fromY, toX, toY] = line.match(INSTRUCTION_MATCHER);
  return { op, fromX: +fromX, fromY: +fromY, toX: +toX, toY: +toY };
});

const configure = (instructions, { version = '1' } = {}) => {
  const lights = new Grid();

  for (const instruction of instructions) {
    const { op, fromX, fromY, toX, toY } = instruction;

    for (let x = fromX; x <= toX; ++x) {
      for (let y = fromY; y <= toY; ++y) {
        if (version === 1) {
          const value = op === 'on' || (op === 'toggle' && !lights.get(x, y));
          lights.set(x, y, +value);
        } else if (version === 2) {
          let value = lights.get(x, y) || 0;
          if (op === 'on') {
            ++value;
          } else if (op === 'off' && value !== 0) {
            --value;
          } else if (op === 'toggle') {
            value += 2;
          }
          lights.set(x, y, value);
        }
      }
    }
  }

  const brightness = sum(lights.map(point => point && point.value));
  const on = lights.filter(point => point && point.value);
  return { lights, brightness, on };
};

export const partOne = solution.inefficient(input => (
  configure(parse(input), { version: 1 }).on.length
));

export const partTwo = solution.inefficient(input => (
  configure(parse(input), { version: 2 }).brightness
));
