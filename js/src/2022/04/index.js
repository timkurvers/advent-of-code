import { solution } from '../../utils/index.js';

const parse = (input) => (
  input.trim().split('\n').map((line) => (
    line.split(',').map((section) => {
      const [start, end] = section.split('-').map(Number);
      return { start, end };
    })
  ))
);

const isContaining = (pair) => {
  const [one, two] = pair;
  return (
    (one.start <= two.start && one.end >= two.end)
    || (two.start <= one.start && two.end >= one.end)
  );
};

const isOverlapping = (pair) => {
  const [one, two] = pair;
  return (
    (one.start >= two.start && one.start <= two.end)
    || (two.start >= one.start && two.start <= one.end)
  );
};

export const partOne = solution((input) => {
  const pairs = parse(input);
  return pairs.filter(isContaining).length;
});

export const partTwo = solution((input) => {
  const pairs = parse(input);
  return pairs.filter(isOverlapping).length;
});
