/* eslint-disable no-cond-assign, no-loop-func */

import { shuffle, solution } from '../../utils';

const REPLACEMENT_MATCHER = /(\w+) => (\w+)/g;

const parse = (input) => {
  const [recipe, medicine] = input.trim().split('\n\n');
  const matches = Array.from(recipe.matchAll(REPLACEMENT_MATCHER));
  const transitions = matches.map((match) => {
    const [, from, to] = match;
    return { from, to };
  });
  return { medicine, transitions };
};

const permute = (string, transitions) => {
  const { length } = string;

  const replacements = [];
  for (let start = 0; start < length; ++start) {
    for (const { from, to } of transitions) {
      const end = start + from.length;
      if (string.slice(start, end) === from) {
        const discovered = `${string.slice(0, start)}${to}${string.slice(end)}`;
        replacements.push(discovered);
      }
    }
  }
  return replacements;
};

const fabricate = (medicine, transitions) => {
  const root = 'e';
  let current = medicine;
  let steps = 0;
  while (current !== root) {
    const antistuck = current;
    for (const { from, to } of transitions) {
      if (!current.includes(to)) {
        continue;
      }
      const next = current.replace(to, from);
      if (!next.includes(root) || next === root) {
        current = next;
        ++steps;
      }
    }
    if (antistuck === current) {
      return null;
    }
  }
  return steps;
};

export const partOne = solution((input) => {
  const { medicine, transitions } = parse(input);
  const replacements = permute(medicine, transitions);
  return new Set(replacements).size;
});

export const partTwo = solution((input) => {
  const { medicine, transitions } = parse(input);

  let steps;
  while (true) {
    // Attempt to fabricate the medicine
    if (steps = fabricate(medicine, transitions)) {
      return steps;
    }
    // Shuffle list of transitions on failure and retry
    shuffle(transitions);
  }
});
