/* eslint-disable no-param-reassign */

import { solution } from '../../utils';

import * as operations from './operations';

const INSTRUCTION_MATCHER = /^(\w+)/;
const ARGUMENT_MATCHER = /(?<=\s)(left|right|\w)(?=\s|$)/g;

const parse = (input) => (
  input.split('\n').map((line) => {
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

export const partOne = solution((input, { password = 'abcdefgh' }) => (
  scramble(parse(input), password)
));
