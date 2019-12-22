import { example } from '../../../utils';

export const partOne = [
  example(`deal with increment 7
deal into new stack
deal into new stack`, '0 3 6 9 2 5 8 1 4 7', { cards: 10, findPositionForCard: null }),

  example(`cut 6
deal with increment 7
deal into new stack`, '3 0 7 4 1 8 5 2 9 6', { cards: 10, findPositionForCard: null }),

  example(`deal with increment 7
deal with increment 9
cut -2`, '6 3 0 7 4 1 8 5 2 9', { cards: 10, findPositionForCard: null }),

  example(`deal into new stack
cut -2
deal with increment 7
cut 8
cut -4
deal with increment 7
cut 3
deal with increment 9
deal with increment 3
cut -1`, '9 2 5 8 1 4 7 0 3 6', { cards: 10, findPositionForCard: null }),
];
