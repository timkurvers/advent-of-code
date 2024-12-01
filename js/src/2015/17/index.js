import {
  combine,
  reduceMinBy,
  solution,
  sum,
} from '../../utils/index.js';

const parse = (input) => input.trim().split('\n').map(Number);

const bruteforce = (containers, total, options = {}) => {
  const combinations = Array.from(combine(containers, options));
  const solutions = combinations.filter((combination) => (
    sum(combination) === total
  ));
  return solutions;
};

export const partOne = solution.inefficient((input, { total = 150 } = {}) => {
  const containers = parse(input);
  const solutions = bruteforce(containers, total);
  return solutions.length;
});

export const partTwo = solution.inefficient((input, { total = 150 } = {}) => {
  const containers = parse(input);
  let solutions = bruteforce(containers, total);
  const smallest = reduceMinBy(solutions, 'length');
  solutions = bruteforce(containers, total, { k: smallest.length });
  return solutions.length;
});
