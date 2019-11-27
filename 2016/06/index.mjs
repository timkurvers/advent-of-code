import { day } from '..';

import examples from './input/examples';
import puzzleInput from './input';

const parse = input => input.split('\n');

const recover = (words, { frequency } = {}) => {
  let result = '';
  const { length } = words[0];
  const multiplier = frequency === 'most' ? 1 : -1;
  for (let p = 0; p < length; ++p) {
    const counts = {};
    for (const word of words) {
      const char = word[p];
      counts[char] = (counts[char] || 0) + 1;
    }

    const top = Object.keys(counts).sort((a, b) => (
      multiplier * (counts[b] - counts[a])
    ));
    result += top[0];
  }
  return result;
};

day(6).part(1).test(examples).feed(puzzleInput).solution(input => (
  recover(parse(input), { frequency: 'most' })
));

day(6).part(2).test(examples).feed(puzzleInput).solution(input => (
  recover(parse(input), { frequency: 'least' })
));
