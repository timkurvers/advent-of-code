import colors from 'colors';
import { performance } from 'perf_hooks';

export const INEFFICIENT = 0;

export class Challenge {
  constructor(year) {
    this._year = year;
    this._day = 0;
    this._part = null;
  }

  get label() {
    if (this._part) {
      return `${this._year} - Day ${this._day} – Part ${this._part}`;
    }
    return `${this._year} - Day ${this._day}`;
  }

  year(number) {
    this._year = number;
    return this;
  }

  day(number) {
    this._day = number;
    return this;
  }

  part(number) {
    this._part = number;
    return this;
  }

  solution(flag, implementation = flag) {
    console.log(colors.cyan(this.label));
    if (flag === INEFFICIENT) {
      console.log(' => Skipped (inefficient solution)');
      console.log();
      return this;
    }

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
