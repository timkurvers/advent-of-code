import { day } from '..';

import Polymer from './Polymer';
import examples from './input/examples';
import puzzleInput from './input';

day(5).part(1).test(examples).feed(puzzleInput).solution((input) => {
  const polymer = Polymer.fromString(input);
  return polymer.react().length;
});

day(5).part(2).test(examples).feed(puzzleInput).solution((input) => {
  const polymer = Polymer.fromString(input);

  const permutations = polymer.uniqueUnits.map(unit => polymer.without(unit));

  const results = permutations.map(permutation => permutation.react())
    .map(result => result.length)
    .sort((a, b) => a - b);

  return results[0];
});
