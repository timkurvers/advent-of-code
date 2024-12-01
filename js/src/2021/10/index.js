import { solution } from '../../utils/index.js';

const parse = (input) => (
  input.trim().split('\n')
);

const OPEN_CLOSE_PAIRS = {
  '(': ')', '[': ']', '{': '}', '<': '>',
};
const CLOSE_OPEN_PAIRS = {
  ')': '(', ']': '[', '}': '{', '>': '<',
};
const INVALID_SCORE = {
  ')': 3, ']': 57, '}': 1197, '>': 25137,
};
const FIX_SCORE = {
  ')': 1, ']': 2, '}': 3, '>': 4,
};

const validate = (line) => {
  const stack = [];
  for (const char of line) {
    if (char in CLOSE_OPEN_PAIRS) {
      const last = stack.pop();
      if (CLOSE_OPEN_PAIRS[char] !== last) {
        return [false, char, stack];
      }
    } else {
      stack.push(char);
    }
  }
  return [true, null, stack];
};

export const partOne = solution((input) => {
  const lines = parse(input);

  let points = 0;
  for (const line of lines) {
    const [valid, syntax] = validate(line);
    if (!valid) {
      points += INVALID_SCORE[syntax];
    }
  }
  return points;
});

export const partTwo = solution((input) => {
  const lines = parse(input);

  const candidates = [];
  for (const line of lines) {
    const [valid,, stack] = validate(line);
    if (valid) {
      const points = stack.reverse().reduce((acc, char) => (
        acc * 5 + FIX_SCORE[OPEN_CLOSE_PAIRS[char]]
      ), 0);
      candidates.push(points);
    }
  }

  const sorted = candidates.sort((a, b) => b - a);
  return sorted[Math.floor(sorted.length / 2)];
});
