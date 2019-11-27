import { day } from '..';

import examples from './input/examples';
import puzzleInput from './input';

const parse = input => input.split(/,?\s+/).map(Number);

day(1).part(1).test(examples).feed(puzzleInput).solution(input => (
  parse(input).reduce((sum, next) => sum + next, 0)
));

day(1).part(2).test(examples).feed(puzzleInput).solution((input) => {
  const parsed = parse(input);

  const findDuplicateFrequency = () => {
    const frequencies = new Set([0]);
    let frequency = 0;

    while (true) {
      for (const entry of parsed) {
        frequency += entry;
        if (frequencies.has(frequency)) {
          return frequency;
        }
        frequencies.add(frequency);
      }
    }
  };

  return findDuplicateFrequency();
});
