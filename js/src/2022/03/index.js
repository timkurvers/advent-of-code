import { solution } from '../../utils/index.js';

const parse = (input) => (
  input.trim().split('\n')
);

const prioritize = (item) => {
  const ord = item.charCodeAt(0);
  return ord <= 90 ? ord - 38 : ord - 96;
};

const findDuplicate = (rucksack) => {
  const half = rucksack.length / 2;
  const first = rucksack.slice(0, half);
  const second = rucksack.slice(half);
  for (const item of first) {
    if (second.includes(item)) {
      return item;
    }
  }
  return null;
};

const findBadge = (group) => {
  const [first, second, third] = group;
  for (const item of first) {
    if (second.includes(item) && third.includes(item)) {
      return item;
    }
  }
  return null;
};

export const partOne = solution((input) => {
  const rucksacks = parse(input);
  return rucksacks.reduce((total, rucksack) => (
    total + prioritize(findDuplicate(rucksack))
  ), 0);
});

export const partTwo = solution((input) => {
  const rucksacks = parse(input);

  let total = 0;
  for (let i = 0; i < rucksacks.length; i += 3) {
    const group = rucksacks.slice(i, i + 3);
    total += prioritize(findBadge(group));
  }
  return total;
});
