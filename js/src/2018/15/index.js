/* eslint-disable no-loop-func */

import { solution, sum } from '../../utils/index.js';

import Map from './Map.js';
import { Elf } from './entities/index.js';

const simulate = (map) => {
  try {
    while (true) {
      map.step();
    }
  } catch (e) {
    return map.round * sum(map.units.map((unit) => unit.hp));
  }
};

export const partOne = solution.inefficient((input) => simulate(new Map(input)));

export const partTwo = solution.inefficient((input) => {
  for (let ap = 4; ; ++ap) {
    const map = new Map(input);
    map.units.forEach((unit) => {
      if (unit instanceof Elf) {
        unit.ap = ap;
      }
    });
    const outcome = simulate(map);
    if (map.graveyard.every((unit) => !(unit instanceof Elf))) {
      return outcome;
    }
  }
});
