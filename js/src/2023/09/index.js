import { cast, solution, sum } from '../../utils/index.js';

const parse = (input) => (
  input.trim().split('\n').map((line) => line.split(' ').map(cast))
);

const isZero = (value) => value === 0;

const derive = (sequence) => {
  const lastIndex = sequence.length - 1;
  return sequence.reduce((list, current, index) => {
    const next = sequence.at(index + 1);
    if (index !== lastIndex) {
      list.push(next - current);
    }
    return list;
  }, []);
};

const extend = (sequence, append = true) => {
  let value = 0;
  if (!sequence.every(isZero)) {
    const derivation = derive(sequence);
    const extended = extend(derivation, append);
    value = append ? sequence.at(-1) + extended.at(-1) : sequence.at(0) - extended.at(0);
  }

  const next = [...sequence];
  if (append) {
    next.push(value);
  } else {
    next.unshift(value);
  }
  return next;
};

export const partOne = solution((input) => {
  const sequences = parse(input);
  const extended = sequences.map((seq) => extend(seq));
  return sum(extended.map((sequence) => sequence.at(-1)));
});

export const partTwo = solution((input) => {
  const sequences = parse(input);
  const extended = sequences.map((seq) => extend(seq, false));
  return sum(extended.map((sequence) => sequence.at(0)));
});
