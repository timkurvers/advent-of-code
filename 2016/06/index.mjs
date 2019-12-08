import { solution } from '../../utils';

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

export const partOne = solution(input => (
  recover(parse(input), { frequency: 'most' })
));

export const partTwo = solution(input => (
  recover(parse(input), { frequency: 'least' })
));
