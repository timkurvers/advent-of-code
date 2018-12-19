/* eslint-disable no-param-reassign */

import Entity from './Entity';

let ord = 65;

class Unit extends Entity {
  constructor(map, coord) {
    super(map, coord);
    this.hp = 200;
    this.ap = 3;
    this.id = String.fromCharCode(ord++);
  }

  get alive() {
    return this.hp > 0;
  }

  get hp() {
    return this._hp;
  }

  set hp(hp) {
    this._hp = hp;
    if (hp < 0) {
      this.map.death(this);
      this.coord = null;
    }
  }

  get label() {
    return `${this.constructor.name} ${this.id} ${this.coord.label}`;
  }

  get enemiesInRange() {
    return this.enemies.filter(enemy => (
      this.coord.distanceTo(enemy.coord) <= 1
    ));
  }

  get enemies() {
    return this.map.units.filter(unit => (
      unit.constructor !== this.constructor
    )).sort((a, b) => a.hp - b.hp);
  }

  act() {
    // Unit died prior to its turn
    if (!this.alive) {
      return;
    }

    // Game ends when no enemies left
    const { enemies } = this;
    if (!enemies.length) {
      throw new Error('No enemies left');
    }

    // Attack closest enemy straight off the bat
    if (this.attack()) {
      return;
    }

    // Otherwise, move towards closest unoccupied coord near closest enemy
    let shortestPath = null;
    this.enemies.forEach((enemy) => {
      const coords = enemy.coord.unoccupiedNeighbors;
      coords.forEach((coord) => {
        const path = this.coord.pathTo(coord);
        if (!path) {
          return;
        }

        if (!shortestPath || path.length < shortestPath.length) {
          shortestPath = path;
        } else if (path.length === shortestPath.length) {
          // Tiebreaker, square in reading order takes priority
          const [, a] = path;
          const [, b] = shortestPath;

          if (a.y < b.y || (a.y === b.y && a.x < b.x)) {
            shortestPath = path;
          }
        }
      });
    });

    // Enemies remaining but cannot get to them
    if (!shortestPath) {
      return;
    }

    // Move along shortest path
    [, this.coord] = shortestPath;
    this.attack();
  }

  attack() {
    const [enemy] = this.enemiesInRange;
    if (enemy) {
      enemy.hp -= this.ap;
      return true;
    }
    return false;
  }
}

class Elf extends Unit {
}

class Goblin extends Unit {
}

export default Unit;
export { Elf, Goblin };
