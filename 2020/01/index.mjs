import { solution } from '../../utils';

const parse = (input) => input.trim().split('\n').map(Number);

const investigate = (entries, { summands, target } = {}) => {
  // When in doubt, do more iteration!
  for (const a of entries) {
    for (const b of entries) {
      for (const c of entries) {
        const sum = a + (summands >= 2 ? b : 0) + (summands >= 3 ? c : 0);
        if (sum === target) {
          return a * (summands >= 2 ? b : 1) * (summands >= 3 ? c : 1);
        }
      }
    }
  }
  return null;
};

export const partOne = solution((input) => {
  const entries = parse(input);
  return investigate(entries, { summands: 2, target: 2020 });
});

export const partTwo = solution((input) => {
  const entries = parse(input);
  return investigate(entries, { summands: 3, target: 2020 });
});
