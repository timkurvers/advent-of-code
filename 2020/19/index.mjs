/* eslint-disable no-cond-assign */

import { cast, solution } from '../../utils';

// Turns given raw rules into proper executable rules
const rulify = (frontier, rules = new Map()) => {
  // Whether argument is ready to be processed: for numbers, the corresponding
  // rule must be previously processed and available in the rules
  const isReady = (arg) => typeof arg !== 'number' || rules.has(arg);

  let current = null;
  while (current = frontier.shift()) {
    // If this rule's arguments are not ready yet, reschedule it
    const ready = current.args.every(isReady);
    if (!ready) {
      frontier.push(current);
      continue;
    }

    // Generate a rule based on the arguments
    const rule = current.args.reduce((str, arg) => {
      if (typeof arg === 'number') {
        // Wrap nested rules to prevent potential grouping issues
        return str + rules.get(arg);
      }
      return str + arg;
    }, '');
    rules.set(current.id, `(${rule})`);
  }
  return rules;
};

const parse = (input) => {
  const parts = input.trim().split('\n\n');

  const frontier = parts[0].split('\n').map((line) => {
    const [id, ...args] = line.replace(/"/g, '').split(' ').map(cast);
    return { id, args };
  });

  const messages = parts[1].split('\n');
  const rules = rulify(frontier);
  return { messages, rules };
};

// Whether given message matches rule completely (start to end)
const isValid = (message, rule) => (
  message.match(new RegExp(`^${rule}$`))
);

export const partOne = solution((input) => {
  const { messages, rules } = parse(input);
  const rule0 = rules.get(0);
  return messages.filter((message) => isValid(message, rule0)).length;
});
