import { solution } from '../../utils';

const parse = (input) => input.split(/,?\s+/).map(Number);

export const partOne = solution((input) => (
  parse(input).reduce((sum, next) => sum + next, 0)
));

export const partTwo = solution((input) => {
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
