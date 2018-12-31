#!/usr/bin/env node --experimental-modules --no-warnings

import { day } from '..';

import Ground from './Ground';
import examples from './input/examples';
import puzzleInput from './input';

const prepare = (input) => {
  const ground = new Ground(input);
  while (ground.activeTiles.length) {
    ground.step();
  }
  return ground;
};

day(17).part(1).test(examples).feed(puzzleInput).solution((input) => {
  const ground = prepare(input);
  return ground.eligibleTiles.filter(tile => tile.isWater).length;
});

day(17).part(2).test(examples).feed(puzzleInput).solution((input) => {
  const ground = prepare(input);
  return ground.eligibleTiles.filter(tile => tile.isStillWater).length;
});
