/* eslint-disable no-cond-assign */

import { cast, patterns, solution } from '../../utils/index.js';

// Creates a rule for given raw rule arguments
const create = (raw, rules) => {
  const recurse = (arg) => create(arg, rules);

  if (raw.includes('|')) {
    return patterns.oneOf(...raw.split(' | ').map(recurse));
  }
  if (raw.includes(' ')) {
    return patterns.sequence(...raw.split(' ').map(recurse));
  }
  const value = cast(raw);
  if (typeof value === 'number') {
    return (defer) => rules.get(value)(defer);
  }
  return patterns.literal(value);
};

const parse = (input) => {
  const parts = input.trim().split('\n\n');

  const rules = new Map();
  const parsed = [];
  for (const line of parts[0].split('\n')) {
    const [id, raw] = line.replace(/"/g, '').split(': ');
    rules.set(+id, create(raw, rules));
  }

  const messages = parts[1].split('\n');
  return { messages, parsed, rules };
};

// Whether given message matches rule in its entirety
const isValid = (message, rule) => patterns.entirely(rule)(message);

export const partOne = solution((input) => {
  const { messages, rules } = parse(input);
  const rule0 = rules.get(0);
  return messages.filter((message) => isValid(message, rule0)).length;
});

export const partTwo = solution((input) => {
  // Override rule 8 and 11
  input = input.replace(/^8:.+$/m, '8: 42 | 42 8');
  input = input.replace(/^11:.+$/m, '11: 42 31 | 42 11 31');

  const { messages, rules } = parse(input);
  const rule0 = rules.get(0);
  return messages.filter((message) => isValid(message, rule0)).length;
});
