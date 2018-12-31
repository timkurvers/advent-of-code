#!/usr/bin/env node --experimental-modules --no-warnings

import { bisect } from '../../utils';
import { day } from '..';

import Reindeer from './Reindeer';
import examples from './input/examples';
import puzzleInput from './input';

day(24).part(1).test(examples).feed(puzzleInput).solution((input) => {
  const reindeer = new Reindeer(input);

  let winner;
  do {
    winner = reindeer.step();
  } while (!winner);

  return winner.units;
});

day(24).part(2).test(examples).feed(puzzleInput).solution((input) => {
  const outcomes = new Map();

  const optimalBonusDamage = bisect(0, 10000, 1, (bonusDamage) => {
    const reindeer = new Reindeer(input);
    reindeer.immuneSystem.bonusDamage = bonusDamage;

    let winner;
    do {
      winner = reindeer.step();
    } while (!winner);

    outcomes.set(bonusDamage, winner);
    return winner === reindeer.immuneSystem;
  });
  return outcomes.get(optimalBonusDamage + 1).units;
});
