/* eslint-disable consistent-return, no-param-reassign */

import { permute, solution } from '../../utils';

import * as operations from './operations';

const INSTRUCTION_MATCHER = /^(\w+)/;
const ARGUMENT_MATCHER = /(?<=\s)(left|right|\w)(?=\s|$)/g;

const parse = (input) => (
  input.trim().split('\n').map((line) => {
    const [opcode] = line.match(INSTRUCTION_MATCHER);
    const args = line.match(ARGUMENT_MATCHER);
    return { opcode, args };
  })
);

const scramble = (instructions, password) => {
  const chars = password.split('');
  for (const instruction of instructions) {
    const { opcode, args } = instruction;
    const operation = operations[opcode];
    operation(chars, ...args);
  }
  return chars.join('');
};

const unscramble = (instructions, scrambled) => {
  const chars = scrambled.split('');
  for (const permutation of permute(chars)) {
    const password = permutation.join('');
    if (scramble(instructions, password) === scrambled) {
      return password;
    }
  }
};

export const partOne = solution((input, { password = 'abcdefgh' }) => (
  scramble(parse(input), password)
));

export const partTwo = solution.inefficient((input, { scrambled = 'fbgdceah' }) => (
  unscramble(parse(input), scrambled)
));
