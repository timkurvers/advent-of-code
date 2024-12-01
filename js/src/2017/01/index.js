import { solution } from '../../utils/index.js';

export const partOne = solution((input) => {
  let sum = 0;
  const { length } = input;
  for (let i = 0; i < length; ++i) {
    const j = (i + 1) % length;
    if (input[i] === input[j]) {
      sum += +input[i];
    }
  }
  return sum;
});

export const partTwo = solution((input) => {
  let sum = 0;
  const { length } = input;
  for (let i = 0; i < length; ++i) {
    const j = (i + length / 2) % length;
    if (input[i] === input[j]) {
      sum += +input[i];
    }
  }
  return sum;
});
