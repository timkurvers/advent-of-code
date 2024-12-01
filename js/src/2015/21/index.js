/* eslint-disable no-param-reassign */

import {
  combine,
  reduceMaxBy,
  reduceMinBy,
  solution,
} from '../../utils/index.js';

import Unit from './Unit.js';
import { Armor, Ring, Weapon } from './Equipment.js';

const parse = (input) => {
  const [hp, damage, armor] = input.match(/\d+/g).map(Number);
  return { hp, damage, armor };
};

const Shop = [
  new Weapon('Dagger', 8, 4, 0),
  new Weapon('Shortsword', 10, 5, 0),
  new Weapon('Warhammer', 25, 6, 0),
  new Weapon('Longsword', 40, 7, 0),
  new Weapon('Greataxe', 74, 8, 0),

  new Armor('Leather', 13, 0, 1),
  new Armor('Chainmail', 31, 0, 2),
  new Armor('Splintmail', 53, 0, 3),
  new Armor('Bandedmail', 75, 0, 4),
  new Armor('Platemail', 102, 0, 5),

  new Ring('Damage +1', 25, 1, 0),
  new Ring('Damage +2', 50, 2, 0),
  new Ring('Damage +3', 100, 3, 0),
  new Ring('Defense +1', 20, 0, 1),
  new Ring('Defense +2', 40, 0, 2),
  new Ring('Defense +3', 80, 0, 3),
];

const validate = (equipment) => {
  const count = equipment.reduce((totals, item) => {
    ++totals[item.type];
    return totals;
  }, {
    [Armor]: 0,
    [Ring]: 0,
    [Weapon]: 0,
  });

  return count[Armor] <= 1 && count[Ring] <= 2 && count[Weapon] === 1;
};

const attack = (attacker, target) => {
  const damage = Math.max(attacker.damage - target.armor, 1);
  target.hp -= damage;
};

const fight = (a, b) => {
  a.revive();
  b.revive();
  while (!a.isDead && !b.isDead) {
    attack(a, b);
    if (!b.isDead) {
      attack(b, a);
    }
  }
  const winner = a.isDead ? b : a;
  return winner;
};

const simulate = (input) => {
  const player = new Unit('Player', { hp: 100 });
  const boss = new Unit('Boss', parse(input));

  // Brute-force equipment scenarios
  const scenarios = Array.from(combine(Shop)).filter(validate);
  const runs = scenarios.map((scenario) => {
    player.equipment = scenario;
    const winner = fight(player, boss);
    return { winner, cost: player.cost };
  });

  return { runs, player, boss };
};

export const partOne = solution.inefficient((input) => {
  const { runs, player } = simulate(input);

  // Find cheapest equipment run where player wins
  const wins = runs.filter((run) => run.winner === player);
  return reduceMinBy(wins, 'cost').cost;
});

export const partTwo = solution.inefficient((input) => {
  const { runs, player } = simulate(input);

  // Find most expensive equipment run where player loses
  const losses = runs.filter((run) => run.winner !== player);
  return reduceMaxBy(losses, 'cost').cost;
});
