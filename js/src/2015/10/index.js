import { solution } from '../../utils/index.js';

const generate = (input) => {
  let output = '';

  const { length } = input;
  let count = 0;
  for (let i = 0; i < length; ++i) {
    const char = input[i];
    ++count;

    const next = input[i + 1];
    if (char !== next) {
      output += `${count}${char}`;
      count = 0;
    }
  }

  return output;
};

const run = (start, { iterations }) => {
  let current = start;
  for (let i = 0; i < iterations; ++i) {
    current = generate(current);
  }
  return current;
};

export const partOne = solution((input) => run(input, { iterations: 40 }).length);

export const partTwo = solution.inefficient((input) => run(input, { iterations: 50 }).length);
