#!/usr/bin/env node --experimental-modules --no-warnings

import { day } from '..';
import { sum } from '../../utils';

import Present from './Present';
import examples from './input/examples';
import puzzleInput from './input';

day(2).part(1).test(examples).feed(puzzleInput).solution((input) => {
  const presents = Present.from(input);
  return sum(presents.map(present => present.wrapping));
});

day(2).part(2).test(examples).feed(puzzleInput).solution((input) => {
  const presents = Present.from(input);
  return sum(presents.map(present => present.ribbon));
});
