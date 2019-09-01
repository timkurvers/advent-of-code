#!/usr/bin/env node --experimental-modules --no-warnings

import { Grid } from '../../utils';
import { day } from '..';

import examples from './input/examples';
import puzzleInput from './input';

const directions = {
  U: 'up',
  D: 'down',
  L: 'left',
  R: 'right',
};

const parse = input => (
  input.split('\n').map(row => row.split('').map(dir => directions[dir]))
);

const crack = (keypad, instructions) => {
  let code = '';
  let current = keypad.find(point => point.value === '5');
  for (const instruction of instructions) {
    for (const step of instruction) {
      current = current[step] || current;
    }
    code += current.value;
  }
  return code;
};

day(2).part(1).test(examples).feed(puzzleInput).solution((input) => {
  const keypad = Grid.from('123\n456\n789');
  const instructions = parse(input);
  return crack(keypad, instructions);
});

day(2).part(2).test(examples).feed(puzzleInput).solution((input) => {
  const keypad = Grid.from('  1  \n 234 \n56789\n ABC \n  D  ');
  const instructions = parse(input);
  return crack(keypad, instructions);
});
