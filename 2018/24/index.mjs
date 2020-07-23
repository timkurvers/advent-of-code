import { bisect, solution } from '../../utils';

import Reindeer from './Reindeer';

export const partOne = solution((input) => {
  const reindeer = new Reindeer(input);

  let winner;
  do {
    winner = reindeer.step();
  } while (!winner);

  return winner.units;
});

export const partTwo = solution(async (input) => {
  const outcomes = new Map();

  const optimalBonusDamage = await bisect({
    lower: 0,
    upper: 10000,
    until: (bonusDamage) => {
      const reindeer = new Reindeer(input);
      reindeer.immuneSystem.bonusDamage = bonusDamage;

      let winner;
      do {
        winner = reindeer.step();
      } while (!winner);

      outcomes.set(bonusDamage, winner);
      return winner === reindeer.immuneSystem;
    },
  });
  return outcomes.get(optimalBonusDamage).units;
});
