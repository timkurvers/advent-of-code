/* eslint-disable no-cond-assign, no-param-reassign */

import { Cache, bisect, solution } from '../../utils';

const REACTION_MATCHER = /(\d+) (\w+)/g;

const parse = (input) => input.split('\n').reduce((lookup, line) => {
  const matches = Array.from(line.matchAll(REACTION_MATCHER));
  const reagents = matches.map(([, quantity, type]) => ({
    quantity: +quantity,
    type,
  }));
  const output = reagents.pop();
  lookup.set(output.type, { ...output, reagents });
  return lookup;
}, new Map());

const produce = (quantity, type, reactions, stock) => {
  const entry = stock.lookup(type);
  const reaction = reactions.get(type);

  // How much of requested chemical needs to be produced?
  const need = quantity - entry.available;
  if (need <= 0) {
    return;
  }

  // Base chemical (with no reaction) does not need to be produced
  if (!reaction) {
    return;
  }

  const times = Math.ceil(need / reaction.quantity);

  for (const reagent of reaction.reagents) {
    const rentry = stock.lookup(reagent.type);
    const amount = reagent.quantity * times;
    produce(amount, reagent.type, reactions, stock);

    // Bail out if one of the reagents could not be produced
    if (rentry.available < amount) {
      return;
    }

    rentry.available -= amount;
    rentry.used += amount;
  }

  entry.available += reaction.quantity * times;
};

export const partOne = solution((input) => {
  const reactions = parse(input);
  const stock = new Cache(() => ({ available: 0, used: 0 }));
  stock.lookup('ORE').available = Infinity;
  produce(1, 'FUEL', reactions, stock);
  return stock.get('ORE').used;
});

export const partTwo = solution(async (input) => {
  const reactions = parse(input);

  const ore = 1_000_000_000_000;

  // Whether requested amount of fuel can be produced with a trillion ore
  const feasible = (fuel) => {
    const stock = new Cache(() => ({ available: 0, used: 0 }));
    stock.lookup('ORE').available = ore;
    produce(fuel, 'FUEL', reactions, stock);
    return stock.get('FUEL').available === fuel;
  };

  return await bisect({
    lower: 1,
    upper: ore,
    until: (fuel) => !feasible(fuel),
  }) - 1;
});
