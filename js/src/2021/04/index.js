/* eslint-disable consistent-return */

import { solution } from '../../utils/index.js';

import Board from './Board.js';

const parse = (input) => {
  const parts = input.trim().split('\n\n');
  const queue = parts.shift().split(',').map(Number);
  const boards = parts.map((part) =>
    Board.from(part, {
      splitter: /(?!^)\s+/,
      cast: Number,
    }),
  );
  return { queue, boards };
};

export const partOne = solution((input) => {
  const { queue, boards } = parse(input);

  for (const nr of queue) {
    for (const board of boards) {
      board.markBingo(nr);
      if (board.hasBingo) {
        return board.score * nr;
      }
    }
  }
});

export const partTwo = solution((input) => {
  const { queue, boards } = parse(input);
  const remaining = new Set(boards);

  for (const nr of queue) {
    for (const board of remaining) {
      board.markBingo(nr);
      if (board.hasBingo) {
        remaining.delete(board);
        if (remaining.size === 0) {
          return board.score * nr;
        }
      }
    }
  }
});
