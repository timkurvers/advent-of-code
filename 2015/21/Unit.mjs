import { sum } from '../../utils';

class Unit {
  constructor(name, definition = {}) {
    this.name = name;
    this.baseHp = definition.hp;
    this.baseDamage = definition.damage || 0;
    this.baseArmor = definition.armor || 0;

    this.hp = this.baseHp;
    this.equipment = [];
  }

  revive() {
    this.hp = this.baseHp;
  }

  get armor() {
    return this.baseArmor + sum(this.equipment.map((item) => item.armor));
  }

  get cost() {
    return sum(this.equipment.map((item) => item.cost));
  }

  get damage() {
    return this.baseDamage + sum(this.equipment.map((item) => item.damage));
  }

  get isDead() {
    return this.hp <= 0;
  }
}

export default Unit;
