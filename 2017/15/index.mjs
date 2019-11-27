import { day } from '..';

import examples from './input/examples';
import puzzleInput from './input';

function* generator(seed, factor, onlyMultiplesOf = null) {
  let previous = seed;
  while (true) {
    const current = (previous * factor) % 2147483647;
    if (!onlyMultiplesOf || current % onlyMultiplesOf === 0) {
      yield current;
    }
    previous = current;
  }
}

const initialize = (input, onlyMultiplesOf = false) => {
  const [seedA, seedB] = input.match(/\d+/g).map(Number);
  const a = generator(seedA, 16807, onlyMultiplesOf ? 4 : null);
  const b = generator(seedB, 48271, onlyMultiplesOf ? 8 : null);
  return [a, b];
};

const judge = (a, b, samples) => {
  const mask = 0b1111111111111111;

  let matches = 0;
  for (let i = 0; i < samples; ++i) {
    if ((a.next().value & mask) === (b.next().value & mask)) {
      matches++;
    }
  }
  return matches;
};

day(15).part(1).test(examples).feed(puzzleInput).inefficient.solution((input) => {
  const [a, b] = initialize(input);
  return judge(a, b, 40000000);
});

day(15).part(2).test(examples).feed(puzzleInput).inefficient.solution((input) => {
  const [a, b] = initialize(input, true);
  return judge(a, b, 5000000);
});
