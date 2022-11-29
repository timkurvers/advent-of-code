import { solution } from '../../utils';

const A = 'a'.charCodeAt(0);
const Z = 'z'.charCodeAt(0);

const parse = (input) => input.split('').map((char) => char.charCodeAt(0));
const reconstruct = (chars) => String.fromCharCode(...chars);

const ILLEGAL_CHARACTERS = parse('ilo');

const validate = (chars) => {
  const { length } = chars;

  let straight = false;
  let pairs = 0;

  for (let i = 0; i < length; ++i) {
    const a = chars[i];
    const b = chars[i + 1];
    const c = chars[i + 2];

    if (ILLEGAL_CHARACTERS.includes(a)) {
      return false;
    }

    if (a + 1 === b && a + 2 === c) {
      straight = true;
    }

    if (a === b && a !== c) {
      ++pairs;
    }
  }

  return straight && pairs >= 2;
};

const step = (chars) => {
  const next = [...chars];
  const { length } = next;

  for (let i = length - 1; i > 0; --i) {
    if (next[i] !== Z) {
      ++next[i];
      break;
    }
    next[i] = A;
  }
  return next;
};

const next = (start) => {
  let current = start;
  do {
    current = step(current);
  } while (!validate(current));
  return current;
};

export const partOne = solution((input) => (
  reconstruct(next(parse(input)))
));

export const partTwo = solution((input) => (
  reconstruct(next(next(parse(input))))
));
