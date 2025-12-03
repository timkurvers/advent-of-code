import { solution } from '../../utils/index.js';

const RANGE_MATCHER = /(\d+)-(\d+)/g;

const parse = (input) => {
  const ranges = [];
  for (const match of input.matchAll(RANGE_MATCHER)) {
    const [, lhs, rhs] = match;
    ranges.push({ first: +lhs, last: +rhs });
  }
  return ranges;
};

const isInvalid = (id, { maxRepetitionCount }) => {
  const str = id.toString();

  // Sequence length (e.g. `123` in `123123`) is somewhere between half the string and a single character
  const max = (str.length / 2) | 0;
  const min = 1;

  for (let seqlen = max; seqlen >= min; --seqlen) {
    // Verify equal chunks (no leftovers)
    if (str.length % seqlen !== 0) {
      continue;
    }

    const chunk = str.slice(0, seqlen);

    // Walk the string and ensure the chunk repeats cleanly
    let offset = 0;
    let match = true;
    while (offset < str.length) {
      if (str.slice(offset, offset + seqlen) !== chunk) {
        match = false;
        break;
      }
      offset += seqlen;
    }

    if (match) {
      const count = offset / seqlen;
      if (!maxRepetitionCount || maxRepetitionCount === count) {
        return true;
      }
    }
  }

  return false;
};

const sumInvalidIds = (ranges, opts = {}) => {
  let sum = 0;
  for (const { first, last } of ranges) {
    for (let id = first; id <= last; ++id) {
      if (isInvalid(id, opts)) {
        sum += id;
      }
    }
  }
  return sum;
};

export const partOne = solution((input) => {
  const ranges = parse(input);
  return sumInvalidIds(ranges, { maxRepetitionCount: 2 });
});

export const partTwo = solution((input) => {
  const ranges = parse(input);
  return sumInvalidIds(ranges);
});
