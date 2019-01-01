#!/usr/bin/env node --experimental-modules --no-warnings

import { day } from '..';

import Program from './Program';
import examples from './input/examples';
import puzzleInput from './input';

day(6).part(1).test(examples).feed(puzzleInput).solution((input) => {
  const { root } = Program.parse(input);
  return root.id;
});

day(6).part(2).test(examples).feed(puzzleInput).solution((input) => {
  const { root } = Program.parse(input);

  let current = root;
  while (current.isImbalanced) {
    const next = Array.from(current.children).find(child => child.isImbalanced);
    if (!next) {
      break;
    }
    current = next;
  }

  return current.imbalance.targetWeight;
});
