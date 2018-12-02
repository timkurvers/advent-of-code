#!/usr/bin/env node --experimental-modules --no-warnings

import Box from './Box';
import input from './input';
import { day } from '../utils';

const boxes = input.map(id => new Box(id));

day(2).part(1).solution(() => {
  const doublesCount = boxes.reduce((sum, next) => sum + next.hasDoubles, 0);
  const triplesCount = boxes.reduce((sum, next) => sum + next.hasTriples, 0);

  return doublesCount * triplesCount;
});

day(2).part(2).solution(() => {
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
