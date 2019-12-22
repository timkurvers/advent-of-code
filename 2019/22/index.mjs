import { range, solution } from '../../utils';

import * as techniques from './techniques';

const parse = input => input.split('\n').map((line) => {
  if (line.includes('increment')) {
    const increment = +line.match(/\d+/);
    return techniques.dealWithIncrement.bind(null, increment);
  }
  if (line.includes('cut')) {
    const amount = +line.match(/-?\d+/);
    return techniques.cut.bind(null, amount);
  }
  return techniques.dealIntoNewStack;
});

export const partOne = solution((input, {
  cards = 10007,
  findPositionForCard = 2019,
}) => {
  let deck = range({ length: cards });
  const process = parse(input);
  for (const technique of process) {
    deck = technique(deck);
  }
  if (findPositionForCard) {
    return deck.indexOf(findPositionForCard);
  }
  return deck.join(' ');
});
