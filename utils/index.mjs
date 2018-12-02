/* eslint-disable import/prefer-default-export */

import colors from 'colors';

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
    const answer = implementation(console.log, this);
    console.log(` => Answer: ${colors.green(answer)}`);
    console.log();
    return this;
  }
}

export const day = number => (
  new Challenge().day(number)
);
