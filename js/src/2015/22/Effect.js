/* eslint-disable no-param-reassign, object-curly-newline */

import { noop } from '../../utils/index.js';

class Effect {
  constructor({ id, apply, dissipate, duration, proc }) {
    this.id = id;
    this._apply = apply || noop;
    this.dissipate = dissipate || noop;
    this.proc = proc || noop;
    this.duration = duration;
  }

  apply(state) {
    const { id, duration } = this;
    state.player.effects.push({ id, duration });
    this._apply(state);
  }
}

export const POISON = new Effect({
  id: 'POISON',
  duration: 6,
  proc: (state) => {
    state.boss.hp -= 3;
  },
});

export const RECHARGE = new Effect({
  id: 'RECHARGE',
  duration: 5,
  proc: (state) => {
    state.player.mp += 101;
  },
});

export const SHIELD = new Effect({
  id: 'SHIELD',
  duration: 6,
  apply: (state) => {
    state.player.armor += 7;
  },
  dissipate: (state) => {
    state.player.armor -= 7;
  },
});
