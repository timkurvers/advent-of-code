import { solution } from '../../utils/index.js';

import Ground from './Ground.js';

const prepare = (input) => {
  const ground = new Ground(input);
  while (ground.activeTiles.length) {
    ground.step();
  }
  return ground;
};

export const partOne = solution((input) => {
  const ground = prepare(input);
  return ground.eligibleTiles.filter((tile) => tile.isWater).length;
});

export const partTwo = solution((input) => {
  const ground = prepare(input);
  return ground.eligibleTiles.filter((tile) => tile.isStillWater).length;
});
