/* eslint-disable no-loop-func */

import colors from 'colors';
import globby from 'globby';
import path from 'path';
import { performance } from 'perf_hooks';

import { titleize } from '..';

class Challenge {
  constructor(id) {
    this.id = id;

    this.year = +id.slice(0, 4);
    this.day = +id.slice(-2);
  }

  get path() {
    return this.id;
  }

  async parts() {
    return import(path.resolve(this.path));
  }

  async run() {
    const parts = await this.parts();
    const examples = await import(path.resolve(this.path, 'input/examples'));
    const {
      default: puzzleInput,
    } = await import(path.resolve(this.path, 'input'));

    for (const [part, solution] of Object.entries(parts)) {
      await this.runPart({
        part,
        solution,
        puzzleInput,
        examples: examples[part],
      });
    }
  }

  async runPart({
    part, solution, puzzleInput, examples = [],
  } = {}) {
    let heading = `${this.year} · Day ${this.day}`;
    if (part !== 'default') {
      heading += ` · ${titleize(part)}`;
    }
    console.log(colors.cyan(heading));

    // Executes and times the solution (used for both puzzle input and examples)
    const execute = async (input, args = {}) => {
      const start = performance.now();
      const answer = await solution(input, args);
      const end = performance.now();
      const duration = Math.ceil(end - start);
      return { answer, duration };
    };

    // Generic line rendering utility
    const line = (label, text, correct, duration = null) => {
      const colored = correct ? colors.green(text) : colors.red(text);
      const suffix = duration ? ` ${colors.gray(`${duration}ms`)}` : '';
      console.log(` => ${label}: ${colored}${suffix}`);
    };

    // Run examples (if any) through this part's solution
    for (const example of examples) {
      const { input, expected, inefficient } = example;
      const excerpt = String(input).replace(/\n|\t/g, ' ').slice(0, 25);
      if (inefficient) {
        line(`Example ${colors.yellow(excerpt)}`, '<inefficient; skipping>');
        continue;
      }

      const { answer, duration } = await execute(input, example.args);
      if (answer == null) {
        line(`Example ${colors.yellow(excerpt)}`, '<not yet solved>');
        continue;
      }

      const passed = answer === expected;
      const text = passed ? answer : `${answer} (expected: ${expected})`;
      line(`Example ${colors.yellow(excerpt)}`, text, passed, duration);
    }

    if (solution.inefficient) {
      line('Answer', '<inefficient; skipping>');
      console.log();
      return;
    }

    if (!puzzleInput) {
      line('Answer', '<no puzzle input provided>');
      console.log();
      return;
    }

    const { answer, duration } = await execute(puzzleInput);
    if (answer == null) {
      line('Answer', '<not yet solved>');
      console.log();
      return;
    }
    line('Answer', answer, true, duration);
    console.log();
  }

  static async list() {
    const ids = await globby('[0-9][0-9][0-9][0-9]/[0-9][0-9]', {
      onlyDirectories: true,
    });
    ids.sort();
    return ids.map((id) => new this(id));
  }
}

export default Challenge;
