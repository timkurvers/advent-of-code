/* eslint-disable no-cond-assign */

import { solution } from '../../utils/index.js';

const decompress = (str, { recursive } = {}) => {
  const matcher = /\((\d+)x(\d+)\)/y;

  let total = 0;

  let i = 0;
  let char = '';
  while ((char = str[i])) {
    if (char === '(') {
      matcher.lastIndex = i;
      const match = matcher.exec(str);

      const chars = +match[1];
      const times = +match[2];
      i += match[0].length;

      const raw = str.slice(i, i + chars);
      const expanded = raw.repeat(times);
      if (recursive) {
        total += decompress(expanded, { recursive });
      } else {
        total += expanded.length;
      }
      i += chars;
    } else {
      ++total;
      ++i;
    }
  }

  return total;
};

export const partOne = solution((input) => decompress(input));

export const partTwo = solution.inefficient((input) => decompress(input, { recursive: true }));
