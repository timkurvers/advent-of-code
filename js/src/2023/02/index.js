/* eslint-disable no-shadow */

import { multiply, solution, sum } from '../../utils/index.js';

const GAME_MATCHER = /Game (?<id>\d+): (?<rest>.+)/;
const REVEAL_MATCHER = /(?<amount>\d+) (?<color>blue|red|green)/g;

const parse = (input) =>
  input
    .trim()
    .split('\n')
    .map((line) => {
      const match = line.match(GAME_MATCHER);
      const id = +match.groups.id;
      const rounds = match.groups.rest.split(';').map((round) =>
        Array.from(round.matchAll(REVEAL_MATCHER)).map((reveal) => ({
          amount: +reveal.groups.amount,
          color: reveal.groups.color,
        })),
      );
      return { id, rounds };
    });

export const partOne = solution((input) => {
  const games = parse(input);

  const available = {
    red: 12,
    green: 13,
    blue: 14,
  };

  const possible = games.filter((game) =>
    game.rounds.every((round) => round.every((reveal) => reveal.amount <= available[reveal.color])),
  );

  return sum(possible.map((game) => game.id));
});

export const partTwo = solution((input) => {
  const games = parse(input);

  return games.reduce((sum, game) => {
    const required = {
      blue: 0,
      red: 0,
      green: 0,
    };
    for (const round of game.rounds) {
      for (const reveal of round) {
        required[reveal.color] = Math.max(required[reveal.color], reveal.amount);
      }
    }
    return sum + multiply(Object.values(required));
  }, 0);
});
