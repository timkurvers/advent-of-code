#!/usr/bin/env node --experimental-modules --no-warnings

import Ground from './Ground';
import input from './input';
import { day } from '../utils';

const ground = new Ground(input);
while (ground.activeTiles.length) {
  ground.step();
}

day(17).part(1).solution(() => (
  ground.eligibleTiles.filter(tile => tile.isWater).length
));

day(17).part(2).solution(() => (
  ground.eligibleTiles.filter(tile => tile.isStillWater).length
));
