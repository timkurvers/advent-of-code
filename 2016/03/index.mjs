#!/usr/bin/env node --experimental-modules --no-warnings

import { day } from '..';

import examples from './input/examples';
import puzzleInput from './input';

const parse = input => (
  input.split('\n').map(row => (
    row.trim().split(/\s+/).map(Number)
  ))
);

const transpose = (sets) => {
  const transposed = [];
  for (let i = 0; i < sets.length; i += 3) {
    const [r1, r2, r3] = sets.slice(i, i + 3);
    transposed[i] = [r1[0], r2[0], r3[0]];
    transposed[i + 1] = [r1[1], r2[1], r3[1]];
    transposed[i + 2] = [r1[2], r2[2], r3[2]];
  }
  return transposed;
};

const isPossibleTriangle = (sides) => {
  const [a, b, c] = sides;
  return a + b > c && a + c > b && b + c > a;
};

day(3).part(1).test(examples).feed(puzzleInput).solution(input => (
  parse(input).filter(isPossibleTriangle).length
));

day(3).part(2).test(examples).feed(puzzleInput).solution(input => (
  transpose(parse(input)).filter(isPossibleTriangle).length
));
