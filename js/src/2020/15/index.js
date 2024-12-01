import { solution } from '../../utils/index.js';

const parse = (input) => input.trim().split(',').map(Number);

const play = (starting, { until }) => {
  // Gigantic array faster than a Map, who woulda thunk! (╯°□°)╯︵ ┻━┻
  const numbers = new Array(until);
  for (const [turn, number] of starting.entries()) {
    numbers[number] = turn + 1;
  }

  let current = null;
  let last = null;
  for (let turn = starting.length + 1; turn <= until; ++turn) {
    if (last) {
      current = turn - 1 - last;
    } else {
      current = 0;
    }
    last = numbers[current];
    numbers[current] = turn;
  }
  return current;
};

export const partOne = solution((input, { turn = 2020 } = {}) => {
  const starting = parse(input);
  return play(starting, { until: turn });
});

export const partTwo = solution.inefficient((input, { turn = 30000000 } = {}) => {
  const starting = parse(input);
  return play(starting, { until: turn });
});
