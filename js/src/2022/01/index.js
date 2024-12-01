import { cast, solution, sum } from '../../utils/index.js';

const parse = (input) =>
  input
    .trim()
    .split('\n\n')
    .map((inventory) => sum(inventory.split('\n').map(cast)));

export const partOne = solution((input) => {
  const inventories = parse(input);
  return Math.max(...inventories);
});

export const partTwo = solution((input) => {
  const inventories = parse(input);
  inventories.sort((a, b) => b - a);
  const top3 = inventories.slice(0, 3);
  return sum(top3);
});
