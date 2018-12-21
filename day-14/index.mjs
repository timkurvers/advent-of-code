#!/usr/bin/env node --experimental-modules --no-warnings

import input from './input/example';
import { day } from '../utils';

let recipes;
let first;
let second;

const initialize = () => {
  first = 0;
  second = 1;
  recipes = [3, 7];
};

const create = () => {
  const sum = recipes[first] + recipes[second];
  const numbers = sum.toString().split('').map(Number);
  recipes.push(...numbers);

  first = (first + 1 + recipes[first]) % recipes.length;
  second = (second + 1 + recipes[second]) % recipes.length;
};

const match = (start, seek) => {
  const { length } = seek;
  for (let i = 0; i < length; ++i) {
    if (recipes[start + i] !== seek[i]) {
      return false;
    }
  }
  return true;
};

day(14).part(1).solution(() => {
  initialize();

  const required = 10;
  while (recipes.length < input + required) {
    create();
  }
  return recipes.slice(input, input + required).join('');
});

day(14).part(2).solution(() => {
  initialize();

  const seek = input.toString().split('').map(Number);
  const { length } = seek;

  while (true) {
    create();

    const offset = recipes.length - length;
    if (match(offset, seek)) {
      return offset;
    }
    if (match(offset - 1, seek)) {
      return offset - 1;
    }
  }
});
