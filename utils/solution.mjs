import colors from 'colors';
import { performance } from 'perf_hooks';

export const example = (input, ...expected) => ({ input, expected });

export class Challenge {
  constructor(year) {
    this._year = year;
    this._day = 0;
    this._part = null;

    this._input = null;
    this._tests = [];
    this._solution = () => {};
    this._inefficient = false;
  }

  get inefficient() {
    this._inefficient = true;
    return this;
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

  feed(input) {
    this._input = input;
    return this;
  }

  test(tests) {
    this._tests = tests;
    return this;
  }

  solution(solution) {
    this._solution = solution;
    this.run();
  }

  run() {
    console.log(colors.cyan(this.label));

    const line = (label, text, correct, duration = null) => {
      const colored = correct ? colors.green(text) : colors.red(text);
      const suffix = duration ? ` ${colors.gray(`${duration}ms`)}` : '';
      console.log(` => ${label}: ${colored}${suffix}`);
    };

    const offset = Math.max(this._part - 1, 0);
    const applicable = this._tests.filter(test => test.expected[offset]);
    for (const test of applicable) {
      const { answer, duration } = this.execute(test.input, true);
      const expected = test.expected[offset];
      const passed = answer === expected;
      const excerpt = test.input.replace(/\t/g, ' ').replace(/\n/g, ' ').slice(0, 25);
      const text = passed ? answer : `${answer} (expected: ${expected})`;
      line(`Example ${colors.yellow(excerpt)}`, text, passed, duration);
    }

    if (!this._input || !this._solution) {
      line('Answer', '<not yet solved>');
      console.log();
      return;
    }

    const { answer, duration } = this.execute(this._input);
    line('Answer', answer, true, duration);
    console.log();
  }

  execute(input, isExample = false) {
    const start = performance.now();
    const answer = this._solution(input, isExample);
    const end = performance.now();
    const duration = Math.ceil(end - start);
    return { answer, duration };
  }
}
