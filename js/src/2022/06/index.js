import { solution } from '../../utils/index.js';

const parse = (input) => input.trim().split('');

// Returns start/end indices of first unique sequence of given length
const findUniqueSequence = (stream, { length }) => {
  for (let i = 0; i < stream.length; ++i) {
    const slice = stream.slice(i, i + length);
    const set = new Set(slice);
    if (set.size === length) {
      return { start: i, end: i + length };
    }
  }
  return null;
};

export const partOne = solution((input) => {
  const stream = parse(input);
  return findUniqueSequence(stream, { length: 4 }).end;
});

export const partTwo = solution((input) => {
  const stream = parse(input);
  return findUniqueSequence(stream, { length: 14 }).end;
});
