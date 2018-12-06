#!/usr/bin/env node --experimental-modules --no-warnings

import Polymer from './Polymer';
import input from './input';
import { day } from '../utils';

day(5).part(1).solution(() => {
  const polymer = Polymer.fromString(input);
  return polymer.react().length;
});

day(5).part(2).solution(() => {
  const polymer = Polymer.fromString(input);

  const permutations = polymer.uniqueUnits.map(unit => polymer.without(unit));

  const results = permutations.map(permutation => permutation.react())
    .map(result => result.length)
    .sort((a, b) => a - b);

  return results[0];
});
