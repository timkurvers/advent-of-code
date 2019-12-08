import { astar, solution } from '../../utils';

import Planet from './Planet';

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

export const partOne = solution((input) => {
  const { COM } = build(input);
  return COM.totalOrbits;
});


export const partTwo = solution((input) => {
  const { YOU, SAN } = build(input);

  const pathing = astar(YOU, SAN, {
    neighborsFor: current => current.connections,
  });

  // Do not count YOU and SAN themselves as orbital transfers
  return pathing.score - 2;
});
