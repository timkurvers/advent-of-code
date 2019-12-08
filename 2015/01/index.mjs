import { solution } from '../../utils';

const counter = regexp => str => (
  (str.match(regexp) || []).length
);

const up = counter(/\(/g);
const down = counter(/\)/g);

export const partOne = solution(input => (
  up(input) - down(input)
));

export const partTwo = solution((input) => {
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
