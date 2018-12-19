#!/usr/bin/env node --experimental-modules --no-warnings

/* eslint-disable no-loop-func, no-param-reassign */

import Map from './Map';
import input from './input/example';
import { Elf } from './entities';
import { day, sum } from '../utils';

const simulate = (map) => {
  try {
    while (true) {
      map.step();
    }
  } catch (e) {
    return map.round * sum(map.units.map(unit => unit.hp));
  }
};

day(15).part(1).solution(() => (
  simulate(new Map(input))
));

day(15).part(2).solution(() => {
  for (let ap = 4; ; ++ap) {
    const map = new Map(input);
    map.units.forEach((unit) => {
      if (unit instanceof Elf) {
        unit.ap = ap;
      }
    });
    const outcome = simulate(map);
    if (map.graveyard.every(unit => !(unit instanceof Elf))) {
      return outcome;
    }
  }
});
