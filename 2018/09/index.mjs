#!/usr/bin/env node --experimental-modules --no-warnings

import { day } from '..';

import Marble from './Marble';
import input from './input';

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
      scores[playerIndex] += round + sought.id;
    } else {
      const next = new Marble(round);
      next.insertAt(current.seek(1));
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

const config = entryToConfig(input);
const playthrough = play(config);

day(9).part(1).solution(() => (
  playthrough.highscore
));

day(9).part(2).solution(() => (
  play({
    ...config,
    targetRound: playthrough.round * 100,
  }).highscore
));
