import { solution } from '../../utils/index.js';

const INSTRUCTION_MATCHER = /(?<op>[a-z]{4})(?: (?<arg>-?\d+))?/g;

const WIDTH = 40;

const parse = (input) => (
  Array.from(input.trim().matchAll(INSTRUCTION_MATCHER)).map((match) => ({
    op: match.groups.op,
    arg: match.groups.arg && +match.groups.arg,
  }))
);

function* run({ instructions }) {
  let x = 1;
  let cycle = 1;
  for (const { op, arg } of instructions) {
    yield { cycle, x };
    ++cycle;

    if (op === 'addx') {
      yield { cycle, x };
      ++cycle;

      x += arg;
    }
  }
}

export const partOne = solution((input) => {
  const instructions = parse(input);

  let score = 0;
  const program = run({ instructions });
  for (const { cycle, x } of program) {
    if (cycle % WIDTH === 20) {
      score += cycle * x;
    }
  }
  return score;
});

export const partTwo = solution((input) => {
  const instructions = parse(input);

  let output = '';
  const program = run({ instructions });
  for (const { cycle, x } of program) {
    const offset = (cycle - 1) % WIDTH;

    const draw = offset === x - 1 || offset === x || offset === x + 1;
    output += draw ? '#' : ' ';

    if (offset === WIDTH - 1) {
      output += '\n';
    }
  }

  console.log();
  console.log(output);
  return '<see visually above>';
});
