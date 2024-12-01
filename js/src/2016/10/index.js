/* eslint-disable no-cond-assign */

import { Cache, cast, solution } from '../../utils/index.js';

import Bot from './Bot.js';

const BOT_MATCHER = /value (\d+) goes to (.+)/g;
const INSTRUCTION_MATCHER = /(.+) gives low to (.+) and high to (.+)/g;

const parse = (input) => {
  const entities = new Cache({ init: (id) => new Bot(id) });

  for (const match of input.matchAll(BOT_MATCHER)) {
    const [, value, id] = match;
    const bot = entities.lookup(id);
    bot.give(cast(value));
  }

  const instructions = Array.from(input.matchAll(INSTRUCTION_MATCHER)).map((match) => {
    const [, from, lowTarget, highTarget] = match;
    return { from, lowTarget, highTarget };
  });

  return { entities, instructions };
};

const simulate = (input, { seek } = {}) => {
  const { entities, instructions } = parse(input);

  let instruction = null;
  while ((instruction = instructions.shift())) {
    const from = entities.lookup(instruction.from);
    const { low, high } = from;

    // Postpone instruction as bot does not have enough chips
    if (from.chips.length < 2) {
      instructions.push(instruction);
      continue;
    }

    // When seeking, is this the bot we are looking for?
    if (seek && low === seek.low && high === seek.high) {
      return from.nr;
    }

    // Deplete and distribute its chips
    from.deplete();

    const lowTarget = entities.lookup(instruction.lowTarget);
    lowTarget.give(low);

    const highTarget = entities.lookup(instruction.highTarget);
    highTarget.give(high);
  }

  return { entities };
};

export const partOne = solution((input, { low = 17, high = 61 } = {}) => {
  const seek = { low, high };
  return simulate(input, { seek });
});

export const partTwo = solution((input) => {
  const { entities } = simulate(input);
  const outputs = [entities.get('output 0'), entities.get('output 1'), entities.get('output 2')];
  return outputs.reduce((total, current) => total * current.value, 1);
});
