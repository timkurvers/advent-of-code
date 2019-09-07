#!/usr/bin/env node --experimental-modules --no-warnings

import { day } from '..';
import { hexmd5 } from '../../utils';

import examples from './input/examples';
import puzzleInput from './input';

const TRIPLET_MATCHER = /(\w)\1{2}/;

const cache = new Map();
const hash = (input, { iterations = 1 } = {}) => {
  let value = cache.get(input);
  if (!value) {
    value = input;
    for (let i = 0; i < iterations; ++i) {
      value = hexmd5(value);
    }
    cache.set(input, value);
  }
  return value;
};

function* generate(salt, { iterations } = {}) {
  let index = 0;

  while (true) {
    const key = hash(`${salt}${index}`, { iterations });
    const match = key.match(TRIPLET_MATCHER);

    if (match) {
      const quintuple = match[1].repeat(5);
      for (let i = index + 1; i <= index + 1001; ++i) {
        const futureKey = hash(`${salt}${i}`, { iterations });
        if (futureKey.includes(quintuple)) {
          yield { index, key };
          break;
        }
      }
    }

    ++index;
  }
}

day(14).part(1).test(examples).feed(puzzleInput).solution((input) => {
  const generator = generate(input);
  const keys = Array.from({ length: 64 }, () => generator.next().value);
  return keys[keys.length - 1].index;
});

day(14).part(2).inefficient.test(examples).feed(puzzleInput).solution((input) => {
  const generator = generate(input, { iterations: 1 + 2016 });
  const keys = Array.from({ length: 64 }, () => generator.next().value);
  return keys[keys.length - 1].index;
});
