import { maxIndex, solution } from '../../utils/index.js';

const parse = (input) => input.split(/\s+/).map(Number);

const reallocate = (banks, { maxSeenCount = 1 } = {}) => {
  let cycles = 0;
  const seen = {};

  const count = banks.length;
  const inheritees = count - 1;

  let snapshot;
  while (true) {
    snapshot = banks.join(' ');
    let entry = seen[snapshot];
    if (!entry) {
      entry = [];
      seen[snapshot] = entry;
    }
    entry.push(cycles);
    if (entry.length > maxSeenCount) {
      break;
    }

    const target = maxIndex(banks);
    let remainder = banks[target];
    banks[target] = 0;

    const share = Math.floor(remainder / inheritees) || 1;
    let index = target + 1;
    while (remainder) {
      const actual = Math.min(share, remainder);
      remainder -= actual;
      banks[index % count] += actual;
      ++index;
    }

    ++cycles;
  }

  return { cycles, seen, snapshot };
};

export const partOne = solution((input) => {
  const banks = parse(input);
  return reallocate(banks).cycles;
});

export const partTwo = solution((input) => {
  const banks = parse(input);
  const { snapshot, seen } = reallocate(banks, { maxSeenCount: 2 });
  const entry = seen[snapshot];
  return entry[2] - entry[1];
});
