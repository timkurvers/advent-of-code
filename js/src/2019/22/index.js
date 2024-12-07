import { mod, modPow, range, solution } from '../../utils/index.js';

import { cut, dealIntoNewStack, dealWithIncrement } from './techniques.js';

const parse = (input, cast = Number) =>
  input
    .trim()
    .split('\n')
    .map((line) => {
      if (line.includes('increment')) {
        const increment = +line.match(/\d+/);
        return [dealWithIncrement, cast(increment)];
      }
      if (line.includes('cut')) {
        const amount = +line.match(/-?\d+/);
        return [cut, cast(amount)];
      }
      return [dealIntoNewStack];
    });

export const partOne = solution((input, { card = 2019, numCards = 10007 }) => {
  let deck = range({ length: numCards });
  const techniques = parse(input);
  for (const [technique, arg] of techniques) {
    deck = technique(deck, arg);
  }
  return deck.indexOf(card);
});

export const partTwo = solution(
  (input, { numCards = 119315717514047n, position = 2020n, repetitions = 101741582076661n }) => {
    numCards = BigInt(numCards);
    position = BigInt(position);
    repetitions = BigInt(repetitions);

    // Due to the insanely large deck size and repetition count involved, need to
    // resort to modular arithmetic to calculate the answer feasibly:
    //
    //   (╯°□°)╯︵ ┻━┻
    //
    // Each deck technique can be represented as a linear congruential function:
    //
    //   ƒ(x) = ax + b mod numCards
    //
    // Composing the deck techniques together allows for calculating the answer,
    // what card is at given position, directly without a trillion iterations.

    // Ported over from a Python 3 solution by zedrdave:
    // https://www.reddit.com/r/adventofcode/comments/ee0rqi/2019_day_22_solutions/fbtugcu/
    let a = 1n;
    let b = 0n;
    const techniques = parse(input, BigInt);
    for (const [technique, arg] of techniques) {
      if (technique === dealIntoNewStack) {
        a *= -1n;
        b = numCards - 1n - b;
      } else if (technique === dealWithIncrement) {
        a *= arg;
        b *= arg;
      } else if (technique === cut) {
        b -= arg;
      }
      a = mod(a, numCards);
      b = mod(b, numCards);
    }

    const r = b * modPow(1n - a, numCards - 2n, numCards);
    const card = mod((position - r) * modPow(a, repetitions * (numCards - 2n), numCards) + r, numCards);
    return Number(card);
  },
);
