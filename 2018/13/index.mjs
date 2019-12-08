import { solution } from '../../utils';

import Mine from './Mine';

export const partOne = solution((input) => {
  try {
    const mine = new Mine(input);
    while (true) {
      mine.step();
    }
  } catch (crash) {
    return `${crash.targetX},${crash.targetY}`;
  }
});

export const partTwo = solution((input) => {
  const mine = new Mine(input);
  mine.cleanUpCrashes = true;
  while (mine.carts.length > 1) {
    mine.step();
  }
  const cart = mine.carts[0];
  return `${cart.x},${cart.y}`;
});
