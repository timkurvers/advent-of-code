/* eslint-disable no-param-reassign */

import { solution } from '../../utils/index.js';

const INSTRUCTION_MATCHER = /(?<type>mul|do|don't)\((?:(?<a>\d+),(?<b>\d+))?\)/g;

const parse = (input) => {
  const instructions = [];
  for (const match of input.matchAll(INSTRUCTION_MATCHER)) {
    instructions.push({
      op: match.groups.type,
      a: +match.groups.a,
      b: +match.groups.b,
    });
  }
  return instructions;
};

const exec = (instructions, { allowDosDonts = false } = {}) => {
  let result = 0;
  let multiply = true;
  for (const { op, a, b } of instructions) {
    if (multiply && op === 'mul') {
      result += a * b;
    } else if (allowDosDonts) {
      multiply = op === 'do';
    }
  }
  return result;
};

export const partOne = solution((input) => {
  const instructions = parse(input);
  return exec(instructions);
});

export const partTwo = solution((input) => {
  const instructions = parse(input);
  return exec(instructions, { allowDosDonts: true });
});
