/* eslint-disable no-cond-assign, no-param-reassign */

import { solution } from '../../utils';

const DANCE_MOVE_MATCHER = /(s|x|p)(\w+)(?:\/(\w+))?/g;

const parse = (input) => {
  const moves = [];

  let match;
  while (match = DANCE_MOVE_MATCHER.exec(input)) {
    const [, id, from, to] = match;
    moves.push({
      id,
      size: id === 's' ? +from : null,
      from: id === 'x' ? +from : from,
      to: id === 'x' ? +to : to,
    });
  }
  return moves;
};

const dance = (programs, moves, iterations = 1) => {
  const tracking = new Map();

  for (let i = 1; i <= iterations; ++i) {
    for (let m = 0; m < moves.length; ++m) {
      const move = moves[m];
      switch (move.id) {
        case 's':
          for (let s = 0; s < move.size; ++s) {
            programs.unshift(programs.pop());
          }
          break;
        case 'x': {
          const { from, to } = move;
          const tmp = programs[from];
          programs[from] = programs[to];
          programs[to] = tmp;
          break;
        }
        case 'p': {
          const from = programs.indexOf(move.from);
          const to = programs.indexOf(move.to);
          const tmp = programs[from];
          programs[from] = programs[to];
          programs[to] = tmp;
          break;
        }
        default:
          break;
      }
    }

    const serialized = programs.join('');
    let entry = tracking.get(serialized);
    if (!entry) {
      entry = { programs: [...programs], offset: i, count: 0 };
      tracking.set(serialized, entry);
    }

    entry.count++;
    if (entry.count >= 2) {
      const permutations = tracking.size;
      const offset = iterations % permutations;

      const found = Array.from(tracking.values()).find(seen => (
        seen.offset === offset
      ));
      return found.programs;
    }
  }

  return programs;
};

const participants = isExample => (
  (isExample ? 'abcde' : 'abcdefghijklmnop').split('')
);

export const partOne = solution((input, isExample) => {
  const programs = participants(isExample);
  const moves = parse(input);
  return dance(programs, moves).join('');
});

export const partTwo = solution((input, isExample) => {
  const programs = participants(isExample);
  const moves = parse(input);
  return dance(programs, moves, 1000000000).join('');
});
