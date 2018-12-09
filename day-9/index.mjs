#!/usr/bin/env node --experimental-modules --no-warnings

import input from './input';
import { day, mod } from '../utils';

const entryToConfig = (entry) => {
  const match = entry.match(/\d+/g);
  return {
    playerCount: +match[0],
    targetRound: +match[1],
  };
};

const play = ({ playerCount, targetRound }) => {
  const marbles = [0];

  const scores = new Array(playerCount).fill(0);

  let marbleIndex = 0;

  const unwrap = index => mod(index, marbles.length) + 1;

  let round = 1;
  while (round <= targetRound) {
    const next = round;

    if (round % 23 === 0) {
      // Special round
      const playerIndex = round % playerCount;

      const at = unwrap(marbleIndex - 8);
      const [worth] = marbles.splice(at, 1);
      scores[playerIndex] += next + worth;

      marbleIndex = at;
    } else {
      const at = unwrap(marbleIndex + 1);
      marbles.splice(at, 0, next);
      marbleIndex = at;
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
const initial = play(config);

day(9).part(1).solution(() => initial.highscore);
