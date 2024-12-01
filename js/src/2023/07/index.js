/* eslint-disable no-param-reassign */

import { cast, dfor, solution, sum } from '../../utils/index.js';

const HAND_BID_MATCHER = /(\w{5}) (\d+)/;

const CARD_VALUES = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
};

const parse = (input) =>
  input
    .trim()
    .split('\n')
    .map((line) => {
      const match = HAND_BID_MATCHER.exec(line);
      const cards = match[1].split('').map((char) => CARD_VALUES[char] || cast(char));
      const bid = cast(match[2]);
      return { line, cards, bid };
    });

// Grades given hand augmenting it with type (see mapping below)
const grade = (hand) => {
  const groups = hand.cards.reduce((acc, card) => {
    acc[card] = (acc[card] || 0) + 1;
    return acc;
  }, {});

  const [first, second] = Object.values(groups)
    .sort((a, b) => b - a)
    .slice(0, 2);

  //   5 => 5    (five of a kind)
  //   4 => 4    (four of a kind)
  // 3,2 => 3.5  (full house)
  //   3 => 3    (three of a kind)
  // 2,2 => 2.5  (two pair)
  //   2 => 2    (one pair)
  //   1 => 1    (high card)
  let type = first;
  if (first === 3 && second === 2) {
    type = 3.5;
  } else if (first === 2 && second === 2) {
    type = 2.5;
  }
  hand.type = type;
  return hand;
};

// Morphs given hand into the strongest possible variant applying joker magic
const strengthen = (hand) => {
  const min = 1;
  const max = CARD_VALUES.A;

  // Generate all possible permutations using jokers
  const variants = Array.from(
    dfor(hand.cards.map((card) => (card === CARD_VALUES.J ? { min, max } : { min: card, max: card }))),
  );

  // Find best permutation
  const best = { variant: null, type: -Infinity };
  for (const variant of variants) {
    const { type } = grade({ cards: variant });
    if (type > best.type) {
      best.type = type;
      best.variant = variant;
    }
  }

  // Jokers are worth less than two in direct comparisons (see compare below)
  const cards = hand.cards.map((card) => (card === CARD_VALUES.J ? 1 : card));

  hand.type = best.type;
  hand.cards = cards;
  return hand;
};

const compare = (a, b) => {
  if (a.type === b.type) {
    for (let c = 0; c <= 4; ++c) {
      const ca = a.cards[c];
      const cb = b.cards[c];
      if (ca === cb) {
        continue;
      }
      return ca - cb;
    }
  }
  return a.type - b.type;
};

export const partOne = solution((input) => {
  const hands = parse(input).map(grade);
  return sum(hands.sort(compare).map((hand, rank) => hand.bid * (rank + 1)));
});

export const partTwo = solution((input) => {
  const hands = parse(input).map(strengthen);
  return sum(hands.sort(compare).map((hand, rank) => hand.bid * (rank + 1)));
});
