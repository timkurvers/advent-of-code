/* eslint-disable no-param-reassign */

import { solution, sum } from '../../utils';

const REACTION_MATCHER = /(\d+) (\w+)/g;

const parse = (input) => input.split('\n').reduce((lookup, line) => {
  const matches = Array.from(line.matchAll(REACTION_MATCHER));
  const inputs = matches.map(([, quantity, type]) => ({
    quantity: +quantity,
    type,
  }));
  const output = inputs.pop();
  lookup.set(output.type, { ...output, inputs });
  return lookup;
}, new Map());

const produce = (quantity, type, reactions, reserves = new Map()) => {
  const reaction = reactions.get(type);

  // Assuming base chemical if reaction cannot be found
  if (!reaction) {
    return quantity;
  }

  let cost = 0;
  while (quantity > 0) {
    // Utilize reserves first (if any)
    let reserve = reserves.get(type) || 0;
    const use = Math.min(quantity, reserve);
    quantity -= use;
    reserve -= use;
    reserves.set(type, reserve);

    if (!quantity) {
      break;
    }

    const subcosts = reaction.inputs.map((input) => (
      produce(input.quantity, input.type, reactions, reserves)
    ));

    const excess = reaction.quantity - quantity;
    if (excess > 0) {
      reserves.set(type, reserves.get(type) + excess);
    }
    cost += sum(subcosts);
    quantity -= reaction.quantity;
  }
  return cost;
};

export const partOne = solution((input) => {
  const reactions = parse(input);
  return produce(1, 'FUEL', reactions);
});
