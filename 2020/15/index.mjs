import { solution } from '../../utils';

const parse = (input) => input.trim().split(',').map(Number);

export const partOne = solution((input, { turn: target = 2020 } = {}) => {
  const starting = parse(input);

  const spoken = new Map();
  let last = null;
  for (let turn = 1; turn <= target; ++turn) {
    if (starting.length) {
      last = starting.shift();
    } else {
      const occurrences = spoken.get(last);
      if (occurrences.length <= 1) {
        last = 0;
      } else {
        last = occurrences[0] - occurrences[1];
      }
    }
    if (!spoken.has(last)) {
      spoken.set(last, [turn]);
    } else {
      spoken.get(last).unshift(turn);
    }
  }
  return last;
});
