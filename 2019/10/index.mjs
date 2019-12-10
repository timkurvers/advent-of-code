import { reduceMaxBy, solution } from '../../utils';

import Asteroid from './Asteroid';

const parse = (input) => {
  const field = [];
  for (const [y, line] of input.split('\n').entries()) {
    const matches = Array.from(line.matchAll(/#/g));
    for (const { index: x } of matches) {
      field.push(new Asteroid(field, x, y));
    }
  }
  return field;
};

export const partOne = solution((input) => {
  const asteroids = parse(input);
  const best = reduceMaxBy(asteroids, 'seenCount');
  return best.seenCount;
});

export const partTwo = solution();
