/* eslint-disable import/prefer-default-export */

import colors from 'colors';
import { performance } from 'perf_hooks';

class Challenge {
  constructor() {
    this._day = 0;
    this._part = 1;
  }

  day(number) {
    this._day = number;
    return this;
  }

  part(number) {
    this._part = number;
    return this;
  }

  solution(implementation) {
    console.log(colors.cyan(`Day ${this._day} – Part ${this._part}`));
    const start = performance.now();
    const answer = implementation(console.log, this);
    const end = performance.now();
    const duration = `${Math.ceil(end - start)}ms`;
    const text = answer ? colors.green(answer) : colors.red('<not yet solved>');
    console.log(` => Answer: ${text} ${colors.gray(duration)}`);
    console.log();
    return this;
  }
}

export const day = number => (
  new Challenge().day(number)
);

export const sum = array => array.reduce((total, next) => total + next, 0);
