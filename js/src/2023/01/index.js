import { overlappingMatch, solution } from '../../utils/index.js';

const COMPLEX_DIGIT_MATCHER = /\d|one|two|three|four|five|six|seven|eight|nine/g;

const WORDS_TO_DIGIT = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const parse = (input) => input.trim().split('\n');

const findDigitsAsStrings = (input) => input.match(/\d/g);

// In addition to regular digits, also finds digit words (one, two, etc.))
const findAllDigitsAsStrings = (input) =>
  // Overlapping ensures `one2eightwo` becomes ['1', '2', '8', '2']
  overlappingMatch(input, COMPLEX_DIGIT_MATCHER).map((digit) => {
    if (digit in WORDS_TO_DIGIT) {
      return String(WORDS_TO_DIGIT[digit]);
    }
    return digit;
  });

export const partOne = solution((input) => {
  const lines = parse(input).map(findDigitsAsStrings);
  return lines.reduce(
    (total, stringDigits) => total + Number(stringDigits[0] + stringDigits[stringDigits.length - 1]),
    0,
  );
});

export const partTwo = solution((input) => {
  const lines = parse(input).map(findAllDigitsAsStrings);
  return lines.reduce(
    (total, stringDigits) => total + Number(stringDigits[0] + stringDigits[stringDigits.length - 1]),
    0,
  );
});
