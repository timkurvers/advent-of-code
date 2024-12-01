/* eslint-disable consistent-return, default-case */

import { Cache, solution } from '../../utils/index.js';

const MONKEY_MATCHER = /(?<id>[a-z]{4}): (?:(?<nr>\d+)|(?<a>[a-z]{4}) (?<op>[-/+*]) (?<b>[a-z]{4}))/g;

const UNKNOWN = Symbol('unknown');

const OpInverse = {
  '+': '-',
  '-': '+',
  '*': '/',
  '/': '*',
};

const parse = (input) => {
  const monkeys = new Cache({
    init: (id) => ({ id }),
  });
  for (const { groups } of input.trim().matchAll(MONKEY_MATCHER)) {
    const monkey = monkeys.lookup(groups.id);
    if (groups.nr) {
      monkey.nr = +groups.nr;
    } else {
      monkey.op = groups.op;
      monkey.a = monkeys.lookup(groups.a);
      monkey.b = monkeys.lookup(groups.b);
    }
  }
  return monkeys;
};

const calc = (a, op, b) => {
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return a / b;
  }
};

const resolve = (expr) => {
  if (expr.nr) {
    return expr.nr;
  }
  const a = resolve(expr.a);
  const b = resolve(expr.b);

  if (a === UNKNOWN || b === UNKNOWN) {
    return UNKNOWN;
  }

  return calc(a, expr.op, b);
};

const solve = (eq) => {
  // Resolve parts of the equation: a = b
  const a = resolve(eq.a);
  const b = resolve(eq.b);

  const next = a === UNKNOWN ? eq.a : eq.b;
  const result = a === UNKNOWN ? b : a;

  // Solved if we reach the unknown element
  if (next.nr === UNKNOWN) {
    return result;
  }

  // Further resolve parts of the equation: lhs [op] rhs = result
  const lhs = resolve(next.a);
  const rhs = resolve(next.b);

  let target;
  let unknown;
  if (lhs === UNKNOWN) {
    // Right-hand-side is constant: lhs [op] constant = result
    target = calc(result, OpInverse[next.op], rhs);
    unknown = next.a;
  } else {
    // Left-hand-side is constant: constant [op] rhs = result
    if (next.op === '-' || next.op === '/') {
      target = calc(lhs, next.op, result);
    } else {
      target = calc(result, OpInverse[next.op], lhs);
    }
    unknown = next.b;
  }

  return solve({ a: unknown, b: { nr: target } });
};

export const partOne = solution((input) => {
  const monkeys = parse(input);
  const root = monkeys.get('root');
  return resolve(root);
});

export const partTwo = solution((input) => {
  const monkeys = parse(input);
  const root = monkeys.get('root');
  monkeys.get('humn').nr = UNKNOWN;
  return solve(root);
});
