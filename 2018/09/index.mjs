#!/usr/bin/env node --experimental-modules --no-warnings

import { LinkedListNode as Marble } from '../../utils';
import { day } from '..';

import examples from './input/examples';
import puzzleInput from './input';

const entryToConfig = (entry) => {
  const match = entry.match(/\d+/g);
  return {
    playerCount: +match[0],
    targetRound: +match[1],
  };
};

const play = ({ playerCount, targetRound }) => {
  const scores = new Array(playerCount).fill(0);

  const root = new Marble(0);
  let current = root;

  let round = 1;
  while (round <= targetRound) {
    if (round % 23 === 0) {
      // Special round
      const sought = current.seek(-7);
      current = sought.next;
      sought.remove();

      const playerIndex = round % playerCount;
      scores[playerIndex] += round + sought.value;
    } else {
      const next = new Marble(round);
      current.seek(1).append(next);
      current = next;
    }

    ++round;
  }

  return {
    scores,
    round,
    highscore: Math.max(...scores),
  };
};

day(9).part(1).test(examples).feed(puzzleInput).solution((input) => {
  const config = entryToConfig(input);
  const playthrough = play(config);
  return playthrough.highscore;
});

day(9).part(2).test(examples).feed(puzzleInput).solution((input) => {
  const config = entryToConfig(input);
  const playthrough = play(config);
  return play({
    ...config,
    targetRound: playthrough.round * 100,
  }).highscore;
});
