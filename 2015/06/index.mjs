/* eslint-disable object-curly-newline */

import { day } from '..';
import { Grid, sum } from '../../utils';

import examples from './input/examples';
import puzzleInput from './input';

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

day(6).part(1).test(examples).feed(puzzleInput).inefficient.solution(input => (
  configure(parse(input), { version: 1 }).on.length
));

day(6).part(2).test(examples).feed(puzzleInput).inefficient.solution(input => (
  configure(parse(input), { version: 2 }).brightness
));
