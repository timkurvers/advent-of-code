/* eslint-disable no-param-reassign, object-curly-newline */

import { astar, clone, solution } from '../../utils/index.js';

import * as effects from './Effect.js';
import * as spells from './Spell.js';

const parse = (input) => input.match(/\d+/g).map(Number);

const applyEffects = (state) => {
  const remaining = [];

  for (const entry of state.player.effects) {
    const effect = effects[entry.id];
    if (effect.proc) {
      effect.proc(state);
    }
    --entry.duration;
    if (entry.duration > 0) {
      remaining.push(entry);
    } else if (effect.dissipate) {
      effect.dissipate(state);
    }
  }
  state.player.effects = remaining;
};

const playerTurn = (state, spell) => {
  state.player.mp -= spell.cost;
  spell.cast(state);
};

const bossTurn = (state) => {
  const dmg = Math.max(1, state.boss.damage - state.player.armor);
  state.player.hp -= dmg;
};

const defaultSteps = [
  applyEffects,
  playerTurn,
  applyEffects,
  bossTurn,
];

const round = (previous, steps, spell) => {
  const state = clone(previous);
  state.spell = spell;

  for (const step of steps) {
    if (state.player.hp <= 0) {
      state.winner = 'boss';
      break;
    }
    if (state.boss.hp <= 0) {
      state.winner = 'player';
      break;
    }
    step(state, spell);
  }

  return state;
};

const simulate = (input, { steps = defaultSteps, hp, mp }) => {
  const [bhp, bdamage] = parse(input);

  const start = {
    player: { hp, mp, armor: 0, effects: [] },
    boss: { hp: bhp, damage: bdamage },
    spell: null,
    winner: null,
  };

  return astar(start, null, {
    cost: (_current, next) => next.spell.cost,
    done: (current) => current.winner === 'player',
    nodesFor: (current) => {
      const { player } = current;

      // Spells castable by player at this point
      const castables = Object.values(spells).filter((spell) => (
        player.mp >= spell.cost
        && !player.effects.find((entry) => (
          // Allow effects that are expiring this turn to be cast again
          entry.id === spell.id && entry.duration > 1
        ))
      ));

      // Simulate next rounds for these castable spells
      const nodes = [];
      for (const spell of castables) {
        const next = round(current, steps, spell);
        if (next.winner !== 'boss') {
          nodes.push(next);
        }
      }
      return nodes;
    },
  });
};

export const partOne = solution.inefficient((input, { hp = 50, mp = 500 }) => {
  const result = simulate(input, { hp, mp });
  return result.score;
});

export const partTwo = solution.inefficient((input, { hp = 50, mp = 500 }) => {
  const applyCurse = (state) => {
    state.player.hp -= 1;
  };

  const steps = [applyCurse, ...defaultSteps];
  const result = simulate(input, { steps, hp, mp });
  return result.score;
});
