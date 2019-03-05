#!/usr/bin/env node --experimental-modules --no-warnings

import { day } from '..';

import Group from './Group';
import examples from './input/examples';
import puzzleInput from './input';

const parse = (input) => {
  const { length } = input;

  const root = new Group(1);
  const stack = [root];
  const trashcan = [];

  let ignore = false;
  let garbage = false;
  for (let i = 1; i < length; ++i) {
    const char = input[i];

    if (ignore) {
      ignore = false;
      continue;
    }

    if (garbage && char !== '>' && char !== '!') {
      trashcan.push(char);
      continue;
    }

    switch (char) {
      case '{': {
        const current = stack[stack.length - 1];
        const group = new Group(current.level + 1);
        current.children.push(group);
        stack.push(group);
        break;
      }
      case '}':
        stack.pop();
        break;
      case '<':
        garbage = true;
        break;
      case '>':
        garbage = false;
        break;
      case '!':
        ignore = true;
        break;
      default:
        break;
    }
  }

  return { root, trashcan };
};

day(9).part(1).test(examples).feed(puzzleInput).solution((input) => {
  const { root } = parse(input);
  return root.score;
});

day(9).part(2).test(examples).feed(puzzleInput).solution((input) => {
  const { trashcan } = parse(input);
  return trashcan.length;
});
