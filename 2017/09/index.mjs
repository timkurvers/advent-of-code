import { solution } from '../../utils';

import Group from './Group';

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

export const partOne = solution((input) => {
  const { root } = parse(input);
  return root.score;
});

export const partTwo = solution((input) => {
  const { trashcan } = parse(input);
  return trashcan.length;
});
