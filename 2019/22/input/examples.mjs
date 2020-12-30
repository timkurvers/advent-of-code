import fs from 'fs';
import path from 'path';

import { dirname, example, stripIndent } from '../../../utils';

const __dirname = dirname(import.meta.url);
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');

export const partOne = [
  // Final deck: 0 3 6 9 2 5 8 1 4 7
  example(stripIndent`
    deal with increment 7
    deal into new stack
    deal into new stack
  `, 3, { card: 9, numCards: 10 }),

  // Final deck: 3 0 7 4 1 8 5 2 9 6
  example(stripIndent`
    cut 6
    deal with increment 7
    deal into new stack
  `, 5, { card: 8, numCards: 10 }),

  // Final deck: 6 3 0 7 4 1 8 5 2 9
  example(stripIndent`
    deal with increment 7
    deal with increment 9
    cut -2
  `, 1, { card: 3, numCards: 10 }),

  // Final deck: 9 2 5 8 1 4 7 0 3 6
  example(stripIndent`
    deal into new stack
    cut -2
    deal with increment 7
    cut 8
    cut -4
    deal with increment 7
    cut 3
    deal with increment 9
    deal with increment 3
    cut -1
  `, 7, { card: 0, numCards: 10 }),
];

export const partTwo = [
  example(input, 2019, { numCards: 10007n, position: 6978n, repetitions: 1n }),
];
