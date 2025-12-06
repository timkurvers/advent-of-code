import { Grid, solution } from '../../utils/index.js';

const operations = {
  '*': (a, b) => a * b,
  '+': (a, b) => a + b,
};

const resolve = (problems) => {
  let total = 0;
  for (const { operands, operation } of problems) {
    total += operands.reduce(operation);
  }
  return total;
};

export const partOne = solution((input) => {
  const lines = input.trim().split('\n');

  const problems = [];
  for (const line of lines) {
    const parts = line.trim().split(/\s+/);

    for (const [index, value] of parts.entries()) {
      problems[index] ??= { operands: [], operation: null };
      const operation = operations[value];
      if (operation) {
        problems[index].operation = operation;
      } else {
        problems[index].operands.push(+value);
      }
    }
  }

  return resolve(problems);
});

export const partTwo = solution((input) => {
  const grid = Grid.from(input);

  const problems = [];

  // TODO: Potentially refactor this to support both part 1 and 2 simultaneously
  let index = 0;
  for (let x = grid.maxX; x >= 0; --x) {
    problems[index] ??= { operands: [], operation: null };

    let operand;
    for (let y = 0; y <= grid.maxY; ++y) {
      const value = grid.get(x, y);

      if (value) {
        if (value in operations) {
          problems[index].operation = operations[value];
        } else {
          operand ??= 0;
          operand *= 10;
          operand += +value;
        }
      }
    }

    if (operand === undefined) {
      ++index;
    } else {
      problems[index].operands.push(+operand);
    }
  }

  return resolve(problems);
});
