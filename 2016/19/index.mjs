import { solution } from '../../utils';

export const partOne = solution((input) => {
  const elves = +input;

  // See: https://en.wikipedia.org/wiki/Josephus_problem#Bitwise
  const bits = elves.toString(2);
  return parseInt(`${bits.slice(1)}1`, 2);
});

export const partTwo = solution((input) => {
  const elves = +input;

  // Convert input to its ternary representation
  const trits = elves.toString(3);
  const highestThirdPower = 3 ** (trits.length - 1);

  // a) Number of elves is exactly its highest third power
  if (elves === highestThirdPower) {
    return elves;
  }

  const highestTrit = +trits[0];
  const remainder = elves % highestThirdPower;

  // b) Highest third power once (example: 3², 9 fits once in 10)
  if (highestTrit === 1) {
    return remainder;
  }

  // c) Highest third power twice (example: 3², 9 fits twice in 21)
  const quotient = elves / highestThirdPower | 0;
  return highestThirdPower + (quotient * remainder);
});
