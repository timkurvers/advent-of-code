/* eslint-disable prefer-const */

import { solution } from '../../utils/index.js';

const ROCK = 1;
const PAPER = 2;
const SCISSORS = 3;

const DRAW = 2;
const WIN = 3;

const WinOver = {
  [ROCK]: PAPER,
  [PAPER]: SCISSORS,
  [SCISSORS]: ROCK,
};

const LoseTo = {
  [ROCK]: SCISSORS,
  [PAPER]: ROCK,
  [SCISSORS]: PAPER,
};

// Converts instruction (ABCXYZ) to 1 (Rock), 2 (Paper) or 3 (Sissors)
const convert = (char) => {
  const ord = char.charCodeAt(0);
  return ord < 88 ? ord - 64 : ord - 87;
};

const parse = (input) => (
  input.trim().split('\n').map((line) => {
    const [p1, p2] = line.split(' ').map(convert);
    return { p1, p2 };
  })
);

// Plays a given round, returning the score obtained by player 2
const play = (round) => {
  const { p1, p2 } = round;
  let score = p2;
  if (p1 === p2) {
    score += 3;
  } else if (p2 === WinOver[p1]) {
    score += 6;
  }
  return score;
};

// Adapts player 2's hand to end the round as indicated
const adapt = (round) => {
  let { p1, p2 } = round;
  if (p2 === DRAW) {
    p2 = p1;
  } else if (p2 === WIN) {
    p2 = WinOver[p1];
  } else {
    p2 = LoseTo[p1];
  }
  return { p1, p2 };
};

export const partOne = solution((input) => {
  const rounds = parse(input);
  return rounds.reduce((total, round) => total + play(round), 0);
});

export const partTwo = solution((input) => {
  const rounds = parse(input);
  return rounds.reduce((total, round) => total + play(adapt(round)), 0);
});
