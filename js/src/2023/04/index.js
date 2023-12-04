/* eslint-disable no-cond-assign, no-loop-func */

import { cast, solution } from '../../utils';

const parse = (input) => (
  input.trim().split('\n').map((line) => {
    const [first, second] = line.split('|');
    const [id, ...winningNrs] = first.match(/\d+/g).map(cast);
    const nrs = second.match(/\d+/g).map(cast);
    return { id, winningNrs, nrs };
  })
);

export const partOne = solution((input) => {
  const cards = parse(input);
  let score = 0;
  for (const card of cards) {
    const winners = card.nrs.filter((have) => card.winningNrs.includes(have));
    if (winners.length) {
      score += 2 ** (winners.length - 1);
    }
  }
  return score;
});

export const partTwo = solution((input) => {
  const cards = parse(input);

  const pile = [...cards];
  let card;
  let amount = 0;
  while (card = pile.pop()) {
    ++amount;
    const winners = card.nrs.filter((have) => card.winningNrs.includes(have));
    if (winners.length) {
      const rewards = cards.slice(card.id, card.id + winners.length);
      pile.push(...rewards);
    }
  }
  return amount;
});
