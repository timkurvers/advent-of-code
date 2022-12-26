/* eslint-disable no-cond-assign */

import { Cache, Grid, solution } from '../../utils';

import CompassPoint from './CompassPoint';

const ELF = '#';

const parse = (input) => {
  const grove = Grid.from(input.trim(), { pointClass: CompassPoint });
  for (const point of grove) {
    if (point.value !== ELF) {
      grove.remove(point.x, point.y);
    }
  }
  return grove;
};

const moves = [
  (elf) => !elf.n && !elf.ne && !elf.nw && [elf.x, elf.y - 1],
  (elf) => !elf.s && !elf.se && !elf.sw && [elf.x, elf.y + 1],
  (elf) => !elf.w && !elf.nw && !elf.sw && [elf.x - 1, elf.y],
  (elf) => !elf.e && !elf.ne && !elf.se && [elf.x + 1, elf.y],
];

const step = (grove, round) => {
  const elves = grove.filter((point) => point.value === ELF);

  const targets = new Cache({
    init: (target) => ({ target, movers: [] }),
    hash: (target) => target && target.join(','),
  });

  const next = new Grid({ pointClass: CompassPoint });
  let movement = false;

  for (const elf of elves) {
    let target = null;
    if (elf.nw || elf.n || elf.ne || elf.w || elf.e || elf.sw || elf.s || elf.se) {
      const offset = (round - 1) % 4;
      for (let i = 0; i < 4; ++i) {
        const move = moves[(i + offset) % 4];
        if (target = move(elf)) {
          movement = true;
          break;
        }
      }
    }
    targets.lookup(target).movers.push(elf);
  }

  for (const { target, movers } of targets.values()) {
    const stationary = !target || movers.length !== 1;
    for (const elf of movers) {
      if (stationary) {
        next.set(elf.x, elf.y, ELF);
      } else {
        next.set(target[0], target[1], ELF);
      }
    }
  }
  return { next, movement };
};

export const partOne = solution((input) => {
  let grove = parse(input);

  for (let round = 1; round <= 10; ++round) {
    grove = step(grove, round).next;
  }

  const elves = grove.filter((point) => point.value === ELF);
  return (grove.width * grove.height) - elves.length;
});

export const partTwo = solution.inefficient((input) => {
  const grove = parse(input);

  let current = grove;
  for (let round = 1; ; ++round) {
    const { next, movement } = step(current, round);
    if (!movement) {
      return round;
    }
    current = next;
  }
});
