#!/usr/bin/env node --experimental-modules --no-warnings

import { day } from '..';

import examples from './input/examples';
import puzzleInput from './input';

const process = (input, strangerThings = false) => {
  const registry = input.split('\n').map(Number);

  let pointer = 0;
  let step = 0;
  while (true) {
    if (!(pointer in registry)) {
      return { steps: step, registry };
    }

    const current = pointer;
    const offset = registry[pointer];
    pointer += offset;

    const adjustment = strangerThings && offset >= 3 ? -1 : 1;
    registry[current] += adjustment;
    ++step;
  }
};

day(5).part(1).test(examples).feed(puzzleInput).solution(input => (
  process(input).steps
));

day(5).part(2).test(examples).feed(puzzleInput).solution(input => (
  process(input, true).steps
));
