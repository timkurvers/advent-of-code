import { solution, sum } from '../../utils';

const parse = (input) => input.trim().split('\n').map(Number);

const isIncreasing = (val, index, arr) => (
  index - 1 in arr && arr[index - 1] < val
);

export const partOne = solution((input) => {
  const measurements = parse(input);
  return measurements.filter(isIncreasing).length;
});

export const partTwo = solution((input) => {
  const measurements = parse(input);

  const windowSums = measurements.map((_, index, arr) => (
    sum(arr.slice(index, index + 3))
  ));

  return windowSums.filter(isIncreasing).length;
});
