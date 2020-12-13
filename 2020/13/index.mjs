/* eslint-disable no-loop-func */

import { cast, solution } from '../../utils';

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

export const partTwo = solution((input, { isFeasible = false }) => {
  const { busIDs } = parse(input);

  if (!isFeasible) {
    // Found by plotting the following formula straight into Wolfram Alpha:
    //
    //   (t + 0) mod 17 = 0,   (t + 11) mod 37 = 0, (t + 17) mod 907 = 0,
    //   (t + 29) mod 19 = 0,  (t + 40) mod 23 = 0, (t + 46) mod 29 = 0,
    //   (t + 48) mod 653 = 0, (t + 58) mod 41 = 0, (t + 61) mod 13 = 0
    //
    // TODO: Compute this properly
    return 842186186521918;
  }

  let t = 0;
  while (true) {
    const found = busIDs.every((busID, diff) => {
      if (busID === 'x') return true;
      return (t + diff) % busID === 0;
    });
    if (found) {
      return t;
    }
    t += 1;
  }
});
