import { solution } from '../../utils';

const parse = (input) => (
  input.trim().split(',').map(Number)
);

export const partOne = solution((input) => {
  const crabs = parse(input).sort((a, b) => a - b);
  const target = crabs[crabs.length / 2];
  let fuel = 0;
  for (const crab of crabs) {
    fuel += Math.abs(crab - target);
  }
  return fuel;
});

export const partTwo = solution((input) => {
  const crabs = parse(input);
  let max = Infinity;
  for (let i = 0; i < Math.max(...crabs); ++i) {
    let fuel = 0;
    for (const crab of crabs) {
      const used = Math.abs(i - crab);
      // See: https://en.wikipedia.org/wiki/Triangular_number
      fuel += (used * (used + 1)) / 2;
    }
    if (fuel < max) {
      max = fuel;
    }
  }
  return max;
});
