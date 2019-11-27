import { day } from '..';

import examples from './input/examples';
import puzzleInput from './input';

const counter = regexp => str => (
  (str.match(regexp) || []).length
);

const up = counter(/\(/g);
const down = counter(/\)/g);

day(1).part(1).test(examples).feed(puzzleInput).solution(input => (
  up(input) - down(input)
));

day(1).part(2).test(examples).feed(puzzleInput).solution((input) => {
  let floor = 0;
  let position = 0;
  while (floor !== -1) {
    const char = input[position];
    if (char === '(') ++floor;
    if (char === ')') --floor;
    position++;
  }
  return position;
});
