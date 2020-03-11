/* eslint-disable no-loop-func */

import { solution } from '../../utils';

const NOTE_MATCHER = /((?:\.|#){2})(\.|#)((?:\.|#){2}) => (#|\.)/;

const parse = (input) => {
  const lines = input.split('\n');
  const [, start] = lines.shift().split('initial state: ');
  lines.shift();
  const notes = lines.map((note) => {
    const [, before, pot, after, change] = note.match(NOTE_MATCHER);
    return {
      before,
      after,
      pot,
      change,
    };
  });

  const pad = '.'.repeat(start.length * 2);
  const initial = `${pad}${start}${pad}`;
  return { initial, notes, pad };
};

const step = (current, notes) => {
  const generation = [];
  for (let i = 0; i < current.length; ++i) {
    const pot = current[i];
    const match = notes.find((note) => {
      const result = note.pot === pot
        && note.before === current.slice(i - 2, i)
        && note.after === current.slice(i + 1, i + 3);
      return result;
    });
    generation[i] = match ? match.change : '.';
  }

  const next = generation.join('');
  return next;
};

const compact = (generation) => generation.replace(/^\.+|\.+$/g, '');

const totalScoreFor = (generation, pad) => (
  generation.split('').reduce((total, next, index) => {
    if (next === '#') {
      return total + index - pad.length;
    }
    return total;
  }, 0)
);

export const partOne = solution((input) => {
  const { initial, notes, pad } = parse(input);

  const generations = 20;

  let current = initial;
  for (let i = 1; i <= generations; ++i) {
    current = step(current, notes);
  }
  return totalScoreFor(current, pad);
});

export const partTwo = solution((input) => {
  const { initial, notes, pad } = parse(input);

  let start;
  let base;
  let increase;
  let current = initial;
  for (let i = 1; i <= 1000; ++i) {
    const previous = current;
    current = step(current, notes);
    if (compact(previous) === compact(current)) {
      start = i;
      base = totalScoreFor(current, pad);
      increase = base - totalScoreFor(previous, pad);
      break;
    }
  }

  const generations = 50000000000;
  return base + ((generations - start) * increase);
});
