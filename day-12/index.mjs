#!/usr/bin/env node --experimental-modules --no-warnings

/* eslint-disable no-loop-func */

import input from './input';
import { day } from '../utils';

const NOTE_MATCHER = /((?:\.|#){2})(\.|#)((?:\.|#){2}) => (#|\.)/;

const pad = '.'.repeat(input.initial.length * 2);
const initial = `${pad}${input.initial}${pad}`;

const notes = input.notes.map((note) => {
  const [, before, pot, after, change] = note.match(NOTE_MATCHER);
  return {
    before,
    after,
    pot,
    change,
  };
});

const step = (current) => {
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

const compact = generation => generation.replace(/^\.+|\.+$/g, '');

const totalScoreFor = generation => (
  generation.split('').reduce((total, next, index) => {
    if (next === '#') {
      return total + index - pad.length;
    }
    return total;
  }, 0)
);

day(12).part(1).solution(() => {
  const generations = 20;

  let current = initial;
  for (let i = 1; i <= generations; ++i) {
    current = step(current);
  }
  return totalScoreFor(current);
});

day(12).part(2).solution(() => {
  let start;
  let base;
  let increase;
  let current = initial;
  for (let i = 1; i <= 1000; ++i) {
    const previous = current;
    current = step(current);
    if (compact(previous) === compact(current)) {
      start = i;
      base = totalScoreFor(current);
      increase = base - totalScoreFor(previous);
      break;
    }
  }

  const generations = 50000000000;
  return base + ((generations - start) * increase);
});
