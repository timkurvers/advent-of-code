import { solution } from '../../utils';

const parse = (input) => input.trim().split(',').map(Number);

const play = (starting, { until }) => {
  // Darn you Map, y u so slow! (╯°□°)╯︵ ┻━┻
  const last = new Map();
  const prelast = new Map();

  for (const [turn, number] of starting.entries()) {
    last.set(number, turn + 1);
  }

  let current = null;
  let isNew = true;
  for (let turn = starting.length + 1; turn <= until; ++turn) {
    if (!isNew) {
      current = last.get(current) - prelast.get(current);
    } else {
      current = 0;
    }
    const seen = last.get(current);
    isNew = seen === undefined;
    prelast.set(current, seen);
    last.set(current, turn);
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
