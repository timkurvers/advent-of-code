import { solution } from '../../utils/index.js';

const parse = (input) => {
  const [template, rest] = input.trim().split('\n\n');
  const rules = rest.split('\n').map((rule) => {
    const [pair, insert] = rule.split(' -> ');
    const pairs = [`${pair[0]}${insert}`, `${insert}${pair[1]}`];
    return { pair, insert, pairs };
  });
  return { template, rules };
};

const evaluate = (start, rules, steps) => {
  // Holds number of occurences of pairs and letters across iterations
  let counts = {};
  const letters = {};
  for (const rule of rules) {
    counts[rule.pair] = 0;
    letters[rule.insert] = 0;
  }

  // Increase initial pair and letter counters
  for (let pos = 0; pos < start.length - 1; ++pos) {
    const slice = start.slice(pos, pos + 2);
    ++counts[slice];
    ++letters[slice[0]];
  }
  ++letters[start[start.length - 1]];

  // For each step:
  // 1) consume a pair (e.g. NN) and decrease its counter
  // 2) increase counter for inserted letter (e.g. C for NN)
  // 2) increase counters for new pairs (e.g. NC and CN replacing NN)
  for (let step = 1; step <= steps; ++step) {
    const next = { ...counts };
    for (const { insert, pair, pairs } of rules) {
      const count = counts[pair];
      if (count > 0) {
        next[pair] -= count;
        letters[insert] += count;
        next[pairs[0]] += count;
        next[pairs[1]] += count;
      }
    }
    counts = next;
  }

  const values = Array.from(Object.values(letters));
  const min = Math.min(...values);
  const max = Math.max(...values);
  return { min, max };
};

export const partOne = solution((input) => {
  const { template, rules } = parse(input);
  const { min, max } = evaluate(template, rules, 10);
  return max - min;
});

export const partTwo = solution((input) => {
  const { template, rules } = parse(input);
  const { min, max } = evaluate(template, rules, 40);
  return max - min;
});
