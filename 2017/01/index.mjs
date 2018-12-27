#!/usr/bin/env node --experimental-modules --no-warnings

import { day } from '..';

import input from './input';

day(1).part(1).solution(() => {
  let sum = 0;
  const { length } = input;
  for (let i = 0; i < length; ++i) {
    const j = (i + 1) % length;
    if (input[i] === input[j]) {
      sum += +input[i];
    }
  }
  return sum;
});

day(1).part(2).solution(() => {
  let sum = 0;
  const { length } = input;
  for (let i = 0; i < length; ++i) {
    const j = (i + length / 2) % length;
    if (input[i] === input[j]) {
      sum += +input[i];
    }
  }
  return sum;
});
