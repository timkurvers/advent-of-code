/* eslint-disable no-cond-assign */

import {
  cast, lcm, solution, stripIndent,
} from '../../utils/index.js';

const MONKEY_MATCHER = new RegExp(stripIndent`
  Monkey (?<id>\\d+):
    Starting items: (?<items>[\\d, ]+)
    Operation: new = old (?<operator>[*+]) (?<arg>\\d+|old)
    Test: divisible by (?<divider>\\d+)
      If true: throw to monkey (?<truetarget>\\d+)
      If false: throw to monkey (?<falsetarget>\\d+)
`, 'g');

const parse = (input) => (
  Array.from(input.matchAll(MONKEY_MATCHER)).map((match) => ({
    id: +match.groups.id,
    items: match.groups.items.split(', ').map(Number),
    operation: {
      operator: match.groups.operator,
      arg: cast(match.groups.arg),
    },
    test: {
      divider: +match.groups.divider,
      truetarget: +match.groups.truetarget,
      falsetarget: +match.groups.falsetarget,
      count: 0,
    },
  }))
);

const simulate = ({ monkeys, rounds, anxious = false }) => {
  // We meet again AoC 2019 day 12! :(
  const modulus = lcm(monkeys.map((monkey) => monkey.test.divider));

  for (let round = 0; round < rounds; ++round) {
    for (const { items, operation, test } of monkeys) {
      let item;
      while (item = items.shift()) {
        let level = item;

        const rhs = operation.arg === 'old' ? item : operation.arg;
        if (operation.operator === '*') {
          level *= rhs;
        } else if (operation.operator === '+') {
          level += rhs;
        }

        if (anxious) {
          level %= modulus;
        } else {
          level = level / 3 | 0;
        }

        const pass = level % test.divider === 0;
        const target = pass ? monkeys[test.truetarget] : monkeys[test.falsetarget];
        target.items.push(level);

        ++test.count;
      }
    }
  }
};

export const partOne = solution((input) => {
  const monkeys = parse(input);
  simulate({ monkeys, rounds: 20 });

  const top = monkeys.sort((a, b) => b.test.count - a.test.count);
  return top[0].test.count * top[1].test.count;
});

export const partTwo = solution((input) => {
  const monkeys = parse(input);
  simulate({ monkeys, rounds: 10000, anxious: true });

  const top = monkeys.sort((a, b) => b.test.count - a.test.count);
  return top[0].test.count * top[1].test.count;
});
