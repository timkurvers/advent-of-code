#!/usr/bin/env node --experimental-modules --no-warnings

/* eslint-disable no-loop-func, no-param-reassign */

import { day } from '..';
import { sum } from '../../utils';

import Map from './Map';
import examples from './input/examples';
import puzzleInput from './input';
import { Elf } from './entities';

const simulate = (map) => {
  try {
    while (true) {
      map.step();
    }
  } catch (e) {
    return map.round * sum(map.units.map(unit => unit.hp));
  }
};

day(15).part(1).test(examples).feed(puzzleInput).inefficient.solution(input => (
  simulate(new Map(input))
));

day(15).part(2).test(examples).feed(puzzleInput).inefficient.solution((input) => {
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
