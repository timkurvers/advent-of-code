import { solution } from '../../utils';

import Box from './Box';

const parse = (input) => input.trim().split('\n').map((id) => new Box(id));

export const partOne = solution((input) => {
  const boxes = parse(input);

  const doublesCount = boxes.reduce((sum, next) => sum + next.hasDoubles, 0);
  const triplesCount = boxes.reduce((sum, next) => sum + next.hasTriples, 0);

  return doublesCount * triplesCount;
});

export const partTwo = solution((input) => {
  const boxes = parse(input);

  let smallestDiff = boxes[0].letters;
  let smallestCommons = [];

  for (const a of boxes) {
    for (const b of boxes) {
      if (a === b) continue;

      const diff = a.lettersDifferenceFrom(b);
      if (diff.length < smallestDiff.length) {
        smallestDiff = diff;
        smallestCommons = a.lettersSharedWith(b);
      }
    }
  }

  return smallestCommons.join('');
});
