/* eslint-disable no-multi-assign */

import { solution } from '../../utils/index.js';

const CRATE_MATCHER = /\[([A-Z])\]/g;
const MOVE_MATCHER = /move (?<count>\d+) from (?<from>\d+) to (?<to>\d+)/g;

const parse = (input) => {
  const [first, second] = input.split('\n\n');

  const stacks = [];
  for (const line of first.split('\n')) {
    for (const match of line.matchAll(CRATE_MATCHER)) {
      const index = match.index / 4;
      const stack = (stacks[index] ||= []);
      stack.unshift(match[1]);
    }
  }

  const procedure = Array.from(second.matchAll(MOVE_MATCHER)).map((match) => ({
    count: +match.groups.count,
    from: +match.groups.from - 1,
    to: +match.groups.to - 1,
  }));

  return { stacks, procedure };
};

const serialize = (stacks) => stacks.reduce((str, stack) => str + stack[stack.length - 1], '');

const step = (stacks, move, { maintainOrder = false } = {}) => {
  const slice = stacks[move.from].splice(-move.count, move.count);
  if (!maintainOrder) {
    slice.reverse();
  }
  stacks[move.to].push(...slice);
};

export const partOne = solution((input) => {
  const { stacks, procedure } = parse(input);
  for (const move of procedure) {
    step(stacks, move);
  }
  return serialize(stacks);
});

export const partTwo = solution((input) => {
  const { stacks, procedure } = parse(input);
  for (const move of procedure) {
    step(stacks, move, { maintainOrder: true });
  }
  return serialize(stacks);
});
