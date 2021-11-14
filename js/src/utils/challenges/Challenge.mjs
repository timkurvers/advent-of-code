/* eslint-disable no-loop-func */

import fs from 'fs';
import path from 'path';

import colors from 'colors';
import globby from 'globby';

import { time, titleize } from '..';

const SRC_ROOT = 'src';

class Challenge {
  constructor(pathWithRoot) {
    this.id = path.relative(SRC_ROOT, pathWithRoot);

    this.year = +this.id.slice(0, 4);
    this.day = +this.id.slice(-2);
  }

  get input() {
    return fs.readFileSync(path.resolve(SRC_ROOT, this.id, 'input/input.txt'), 'utf8');
  }

  get path() {
    return path.join(SRC_ROOT, this.id);
  }

  async parts() {
    return import(path.resolve(this.path));
  }

  async run() {
    const parts = await this.parts();
    const examples = await import(path.resolve(this.path, 'input/examples'));
    const puzzleInput = this.input;

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
      const [duration, answer] = await time(() => solution(input, args));
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
      const excerpt = String(input).replace(/\s+/g, ' ').trim().slice(0, 25);
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
    const paths = await globby(path.join(SRC_ROOT, '[0-9][0-9][0-9][0-9]/[0-9][0-9]'), {
      onlyDirectories: true,
    });
    paths.sort();
    return paths.map((pathWithRoot) => new this(pathWithRoot));
  }
}

export default Challenge;
export { SRC_ROOT };
