import { solution } from '../../utils/index.js';

import Polymer from './Polymer.js';

export const partOne = solution((input) => {
  const polymer = Polymer.fromString(input);
  return polymer.react().length;
});

export const partTwo = solution((input) => {
  const polymer = Polymer.fromString(input);

  const permutations = polymer.uniqueUnits.map((unit) => polymer.without(unit));

  const results = permutations
    .map((permutation) => permutation.react())
    .map((result) => result.length)
    .sort((a, b) => a - b);

  return results[0];
});
