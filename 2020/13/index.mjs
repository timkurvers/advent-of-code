/* eslint-disable no-loop-func */

import {
  cast, multiply, mulInv, solution, zip,
} from '../../utils';

const parse = (input) => {
  const lines = input.trim().split('\n');
  const start = +lines[0];
  const busIDs = lines[1].split(',').map(cast);
  return { start, busIDs };
};

export const partOne = solution((input) => {
  const { start, busIDs } = parse(input);

  let t = start;
  while (true) {
    const available = busIDs.find((busID) => t % busID === 0);
    if (available) {
      return available * (t - start);
    }
    ++t;
  }
});

// See: https://rosettacode.org/wiki/Chinese_remainder_theorem#JavaScript
const crt = (...congruences) => {
  const [rem, mod] = zip(...congruences);
  let sum = 0;
  const product = multiply(mod);
  for (let i = 0; i < mod.length; ++i) {
    const [ni, ri] = [mod[i], rem[i]];
    const p = Math.floor(product / ni);
    sum += ri * p * mulInv(p, ni);
  }
  return sum % product;
};

export const partTwo = solution((input) => {
  const { busIDs } = parse(input);

  // Builds a list of congruences, adjusting the remainder such that each bus
  // departs at the required offset time.
  //
  // Given example '7,13,x,x,59,x,31,19': bus route 13 should depart one minute
  // after bus 7, so t % 13 == 12. This list of congruences [[12, 13], ..] is
  // passed into Chinese Remainder Theorem above, to find the correct time.
  //
  const congruences = busIDs.reduce((result, busID, offset) => {
    if (busID !== 'x') {
      result.push([busID - offset, busID]);
    }
    return result;
  }, []);
  return crt(...congruences);
});
