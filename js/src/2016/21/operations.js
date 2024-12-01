/* eslint-disable no-param-reassign */

import { wrap } from '../../utils/index.js';

const resolve = (chars, ref) => {
  if (chars[ref]) {
    return +ref;
  }
  return chars.indexOf(ref);
};

/*
move position 5 to position 4
*/
export const move = (chars, from, to) => {
  const [char] = chars.splice(from, 1);
  chars.splice(to, 0, char);
};

/*
reverse positions 5 through 6
*/
export const reverse = (chars, from, to) => {
  const copy = [...chars];
  for (let i = 0; i <= to - from; ++i) {
    chars[+from + i] = copy[+to - i];
  }
};

/*
rotate left 5 steps
rotate right 7 steps
rotate based on position of letter d
*/
export const rotate = (chars, direction, steps) => {
  if (direction !== 'left' && direction !== 'right') {
    steps = resolve(chars, direction);
    if (steps >= 4) {
      ++steps;
    }
    ++steps;
    direction = 'right';
  }

  if (direction === 'left') {
    steps *= -1;
  }

  const { length } = chars;
  const copy = [...chars];
  for (let i = 0; i < length; ++i) {
    const index = wrap(i - steps, length);
    chars[i] = copy[index];
  }
};

/*
swap letter e with letter g
swap position 3 with position 7
*/
export const swap = (chars, refA, refB) => {
  const a = resolve(chars, refA);
  const b = resolve(chars, refB);

  const tmp = chars[a];
  chars[a] = chars[b];
  chars[b] = tmp;
};
