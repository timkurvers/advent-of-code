import { mod, solution } from '../../utils/index.js';

const parse = (input) => input.trim().split('\n').map(Number);

const prune = (value) => mod(value, 16777216);

const mix = (value, secret) => value ^ secret;

const next = (value) => {
  let result = prune(mix(value * 64, value));
  result = prune(mix((result / 32) | 0, result));
  result = prune(mix(result * 2048, result));
  return result;
};

export const partOne = solution((input) => {
  const numbers = parse(input);

  let sum = 0;
  for (const number of numbers) {
    let result = number;
    for (let i = 0; i < 2000; ++i) {
      result = next(result);
    }
    sum += result;
  }
  return sum;
});

// TODO: Ain't nobody got time for part two ;)
