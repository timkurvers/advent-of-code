import { dfor, solution } from '../../utils/index.js';

const Operator = {
  ADD: 0,
  MULTIPLY: 1,
  COMBINE: 2,
};

const parse = (input) =>
  input
    .trim()
    .split('\n')
    .map((line) => {
      const [target, ...operands] = line.split(/:?\s/).map(Number);
      return { target, operands };
    });

const calculate = (operands, operators) =>
  operands.reduce((lhs, rhs, index) => {
    const operator = operators[index];
    switch (operator) {
      case Operator.ADD:
        return lhs + rhs;
      case Operator.MULTIPLY:
        return lhs * rhs;
      case Operator.COMBINE:
        return Number(`${lhs}${rhs}`);
      default:
        return lhs * 0;
    }
  });

const verify = (equation, { allowCombine = false } = {}) => {
  const { target, operands } = equation;

  const boundaries = Array.from({ length: operands.length }, () => ({
    min: Operator.ADD,
    max: allowCombine ? Operator.COMBINE : Operator.MULTIPLY,
  }));

  for (const operators of dfor(boundaries)) {
    const result = calculate(operands, operators);
    if (result === target) {
      return true;
    }
  }
  return false;
};

export const partOne = solution((input) => {
  const equations = parse(input);
  return equations.reduce((sum, equation) => {
    if (verify(equation)) {
      sum += equation.target;
    }
    return sum;
  }, 0);
});

export const partTwo = solution.inefficient((input) => {
  const equations = parse(input);
  return equations.reduce((sum, equation) => {
    if (verify(equation, { allowCombine: true })) {
      sum += equation.target;
    }
    return sum;
  }, 0);
});
