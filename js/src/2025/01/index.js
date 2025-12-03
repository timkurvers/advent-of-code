import { mod, solution } from '../../utils/index.js';

const SAFE_DIAL_SIZE = 100;

const parse = (input) => {
  const instructions = input
    .trim()
    .split('\n')
    .map((line) => {
      const sign = line[0] === 'R' ? 1 : -1;
      const amount = +line.slice(1);
      return { sign, amount };
    });
  return instructions;
};

const zeroes = (instructions, { includePassthroughs = false } = {}) => {
  let current = 50;

  let count = 0;
  for (const { sign, amount } of instructions) {
    for (let i = 1; i <= amount; ++i) {
      const next = mod(current + sign, SAFE_DIAL_SIZE);

      if (next === 0 && (includePassthroughs || i === amount)) {
        ++count;
      }

      current = next;
    }
  }
  return count;
};

export const partOne = solution((input) => {
  const instructions = parse(input);
  return zeroes(instructions);
});

export const partTwo = solution((input, { includePassthroughs = true }) => {
  const instructions = parse(input);
  return zeroes(instructions, { includePassthroughs });
});
