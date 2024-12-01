/* eslint-disable no-cond-assign */

import { Cache, solution, sum } from '../../utils/index.js';

const BAG_RULES_SPLIT = ' bags contain ';
const BAG_RULES_CONTENTS_MATCHER = /(?<quantity>\d+) (?<name>.+?) bags?/g;

class Bag {
  constructor(name) {
    this.name = name;
    this.contains = [];
    this.containedBy = [];
  }

  // Computes amount of bags within this bag (inclusive)
  get bagCount() {
    return 1 + sum(this.contains.map((entry) => (
      entry.quantity * entry.bag.bagCount
    )));
  }
}

const parse = (input) => {
  const bags = new Cache({
    init: (name) => new Bag(name),
  });

  const lines = input.trim().split('\n');
  for (const line of lines) {
    const [name, contents] = line.split(BAG_RULES_SPLIT);
    const bag = bags.lookup(name);

    for (const match of contents.matchAll(BAG_RULES_CONTENTS_MATCHER)) {
      const nestedBag = bags.lookup(match.groups.name);
      const entry = {
        quantity: +match.groups.quantity,
        bag: nestedBag,
      };
      bag.contains.push(entry);
      nestedBag.containedBy.push(bag);
    }
  }
  return bags;
};

export const partOne = solution((input) => {
  const bags = parse(input);

  // Collect all valid containers for a shiny gold bag
  const shiny = bags.get('shiny gold');
  const containers = new Set();
  const candidates = [...shiny.containedBy];
  let candidate;
  while (candidate = candidates.shift()) {
    containers.add(candidate);
    candidates.push(...candidate.containedBy);
  }
  return containers.size;
});

export const partTwo = solution((input) => {
  const bags = parse(input);
  const shiny = bags.get('shiny gold');
  return shiny.bagCount - 1;
});
