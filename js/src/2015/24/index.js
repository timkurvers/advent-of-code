/* eslint-disable consistent-return */

import { combine, multiply, solution, sum } from '../../utils/index.js';

const parse = (input) => input.trim().split(/\s+/).map(Number);
const qe = (numbers) => multiply(numbers);

const plan = (packages, { numGroups = 3 }) => {
  const count = packages.length;
  const total = sum(packages);
  const weight = total / numGroups;

  const candidates = [];
  for (let i = 1; i <= count; ++i) {
    for (const combination of combine(packages, { k: i })) {
      if (sum(combination) === weight) {
        combination.qe = qe(combination);
        candidates.push(combination);
      }
    }
    if (candidates.length > 0) {
      return candidates;
    }
  }
};

const best = (candidates) =>
  candidates.reduce((winner, next) => {
    if (next.length < winner.length) {
      return next;
    }
    if (next.length === winner.length && next.qe < winner.qe) {
      return next;
    }
    return winner;
  });

export const partOne = solution.inefficient((input) => {
  const packages = parse(input);
  const candidates = plan(packages, { numGroups: 3 });
  return best(candidates).qe;
});

export const partTwo = solution((input) => {
  const packages = parse(input);
  const candidates = plan(packages, { numGroups: 4 });
  return best(candidates).qe;
});
