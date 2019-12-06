import { day } from '..';
import { astar } from '../../utils';

import Planet from './Planet';
import examples from './input/examples';
import puzzleInput from './input';

const ORBIT_MATCHER = /(\w+)\)(\w+)/g;

const build = (input) => {
  const system = {};

  const lookup = (id) => {
    let planet = system[id];
    if (!planet) {
      planet = new Planet(id);
      system[id] = planet;
    }
    return planet;
  };

  for (const [, aid, bid] of input.matchAll(ORBIT_MATCHER)) {
    const a = lookup(aid);
    const b = lookup(bid);
    b.parent = a;
  }

  return system;
};

day(6).part(1).test(examples).feed(puzzleInput).solution((input) => {
  const { COM } = build(input);
  return COM.totalOrbits;
});

day(6).part(2).test(examples).feed(puzzleInput).solution((input) => {
  const { YOU, SAN } = build(input);

  const pathing = astar(YOU, SAN, {
    neighborsFor: current => current.connections,
  });

  // Do not count YOU and SAN themselves as orbital transfers
  return pathing.score - 2;
});
