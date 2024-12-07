import { solution } from '../../utils/index.js';

const parse = (input) => {
  const [first, second] = input.trim().split('\n\n');

  const rules = Object.groupBy(
    first.split('\n').map((line) => {
      const [before, other] = line.split('|').map(Number);
      return { before, other };
    }),
    (rule) => rule.before,
  );

  const updates = second.split('\n').map((line) => line.split(',').map(Number));

  return { rules, updates };
};

const inspect = (update, rules) => {
  const sorting = [...update];

  let initiallyCorrect = true;
  for (let index = 0; index < sorting.length; ++index) {
    const page = sorting[index];
    if (!rules[page]) {
      continue;
    }

    for (const { other } of rules[page]) {
      const otherIndex = sorting.indexOf(other);
      if (otherIndex !== -1 && otherIndex < index) {
        sorting[index] = other;
        sorting[otherIndex] = page;
        initiallyCorrect = false;
        // There is probably a more efficient place to continue, but #yolo
        index = -1;
      }
    }
  }

  return { original: update, corrected: sorting, initiallyCorrect };
};

const middleValue = (update) => update[(update.length / 2) | 0];

export const partOne = solution((input) => {
  const { rules, updates } = parse(input);
  return updates.reduce((sum, update) => {
    const result = inspect(update, rules);
    if (result.initiallyCorrect) {
      sum += middleValue(update);
    }
    return sum;
  }, 0);
});

export const partTwo = solution((input) => {
  const { rules, updates } = parse(input);
  return updates.reduce((sum, update) => {
    const result = inspect(update, rules);
    if (!result.initiallyCorrect) {
      sum += middleValue(result.corrected);
    }
    return sum;
  }, 0);
});
