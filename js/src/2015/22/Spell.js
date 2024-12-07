import * as effects from './Effect.js';

class Spell {
  constructor({ id, cost, cast }) {
    this.id = id;
    this.cost = cost;
    this.cast = cast;
  }
}

export const DRAIN = new Spell({
  id: 'DRAIN',
  cost: 73,
  cast: (state) => {
    state.boss.hp -= 2;
    state.player.hp += 2;
  },
});

export const MAGIC_MISSILE = new Spell({
  id: 'MAGIC_MISSILE',
  cost: 53,
  cast: (state) => {
    state.boss.hp -= 4;
  },
});

export const POISON = new Spell({
  id: 'POISON',
  cost: 173,
  cast: (state) => {
    effects.POISON.apply(state);
  },
});

export const RECHARGE = new Spell({
  id: 'RECHARGE',
  cost: 229,
  cast: (state) => {
    effects.RECHARGE.apply(state);
  },
});

export const SHIELD = new Spell({
  id: 'SHIELD',
  cost: 113,
  cast: (state) => {
    effects.SHIELD.apply(state);
  },
});
