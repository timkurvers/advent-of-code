import { day } from '..';

import Mine from './Mine';
import examples from './input/examples';
import puzzleInput from './input';

day(13).part(1).test(examples).feed(puzzleInput).solution((input) => {
  try {
    const mine = new Mine(input);
    while (true) {
      mine.step();
    }
  } catch (crash) {
    return `${crash.targetX},${crash.targetY}`;
  }
});

day(13).part(2).test(examples).feed(puzzleInput).solution((input) => {
  const mine = new Mine(input);
  mine.cleanUpCrashes = true;
  while (mine.carts.length > 1) {
    mine.step();
  }
  const cart = mine.carts[0];
  return `${cart.x},${cart.y}`;
});
