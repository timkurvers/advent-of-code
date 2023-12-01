/* eslint-disable no-loop-func, no-param-reassign */

import fs from 'fs';
import path from 'path';
import YAML from 'yaml';

import colors from 'colors';
import globby from 'globby';

import {
  camelcase, sum, time, titleize,
} from '..';

const SRC_ROOT = 'src';
const PUZZLE_ROOT = '../puzzles';

const camelcaseKeysFor = (original) => (
  Object.entries(original).reduce((obj, [key, value]) => {
    obj[camelcase(key)] = value;
    return obj;
  }, {})
);

class Challenge {
  constructor(pathWithRoot) {
    this.id = path.relative(SRC_ROOT, pathWithRoot);

    this.year = +this.id.slice(0, 4);
    this.day = +this.id.slice(-2);
  }

  get examples() {
    const src = fs.readFileSync(path.resolve(PUZZLE_ROOT, this.id, 'examples.yaml'), 'utf8');
    const yaml = YAML.parse(src);
    return yaml ? camelcaseKeysFor(yaml) : {};
  }

  get input() {
    return fs.readFileSync(path.resolve(PUZZLE_ROOT, this.id, 'input.txt'), 'utf8');
  }

  get path() {
    return path.join(SRC_ROOT, this.id);
  }

  async parts() {
    return import(path.resolve(this.path));
  }

  async run({ benchmark = false } = {}) {
    const parts = await this.parts();
    const { input: puzzleInput, examples } = this;

    for (const [part, solution] of Object.entries(parts)) {
      await this.runPart({
        part,
        solution,
        puzzleInput,
        examples: examples[part],
        benchmark,
      });
    }
  }

  async runPart({
    part, solution, puzzleInput, examples = [], benchmark,
  } = {}) {
    const heading = `${this.year} · Day ${this.day} · ${titleize(part)}`;
    console.log(colors.cyan(heading));

    const formatDuration = (duration) => {
      if (!duration) return '';
      if (duration < 1) return `${Math.ceil(duration * 1000)}μs`;
      return `${Math.ceil(duration)}ms`;
    };

    // Executes and times the solution (used for both puzzle input and examples)
    const iterations = benchmark ? 1000 : 1;
    const execute = async (input, args = {}) => {
      const runs = [];
      for (let i = 0; i < iterations; ++i) {
        const [duration, answer] = await time(() => solution(input, args));
        runs.push({ duration, answer });
      }

      // Only care about answer from the first run
      const { duration, answer } = runs[0];

      // Calculate benchmark stats
      let bench;
      if (iterations > 1) {
        const durations = runs.map((run) => run.duration);
        bench = {
          avg: sum(durations) / iterations,
          min: Math.min(...durations),
          max: Math.max(...durations),
          first: duration,
        };
      }

      return { answer, duration, bench };
    };

    // Generic line rendering utility
    const line = (label, text, correct, duration = null, bench = null) => {
      const colored = correct ? colors.green(text) : colors.red(text);
      let suffix = '';
      if (bench) {
        const results = Object.entries(bench).map(([k, v]) => (
          `${k}: ${formatDuration(v).padStart(5, ' ')}`
        ));
        suffix += `\n    ${colors.gray(`{ ${results.join(', ')} }`)}`;
      } else if (duration) {
        suffix += ` ${colors.gray(formatDuration(duration))}`;
      }
      console.log(` => ${label}: ${colored}${suffix}`);
    };

    // Run examples (if any) through this part's solution
    for (const example of examples) {
      const { input, answer: expected, inefficient } = example;
      const excerpt = String(input).replace(/\s+/g, ' ').trim().slice(0, 25);
      if (inefficient) {
        line(`Example ${colors.yellow(excerpt)}`, '[inefficient; skipping]');
        continue;
      }

      const { answer, duration, bench } = await execute(
        input, example.args ? camelcaseKeysFor(example.args) : {},
      );

      const passed = answer === expected;
      if (answer == null) {
        line(`Example ${colors.yellow(excerpt)}`, '[not yet solved]');
      } else {
        const text = passed ? answer : `${answer} (expected: ${expected})`;
        line(`Example ${colors.yellow(excerpt)}`, text, passed, duration, bench);
      }
      if (!passed) {
        console.log();
        return;
      }
    }

    if (solution.inefficient) {
      line('Answer', '[inefficient; skipping]');
      console.log();
      return;
    }

    if (!puzzleInput) {
      line('Answer', '[no puzzle input provided]');
      console.log();
      return;
    }

    const { answer, duration, bench } = await execute(puzzleInput);
    if (answer == null) {
      line('Answer', '[not yet solved]');
      console.log();
      return;
    }
    line('Answer', answer, true, duration, bench);
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
export { PUZZLE_ROOT, SRC_ROOT };
