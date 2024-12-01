import { solution, sum } from '../../utils/index.js';

import Present from './Present.js';

export const partOne = solution((input) => {
  const presents = Present.from(input);
  return sum(presents.map((present) => present.wrapping));
});

export const partTwo = solution((input) => {
  const presents = Present.from(input);
  return sum(presents.map((present) => present.ribbon));
});
