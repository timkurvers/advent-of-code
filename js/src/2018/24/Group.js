/* eslint-disable prefer-destructuring */

const DEFINITION_MATCHER =
  /(\d+) units each with (\d+) hit points(?: \((.+?)\))? with an attack that does (\d+) (\w+) damage at initiative (\d+)/;

class Group {
  constructor(army, definition) {
    this.army = army;
    this.id = army.groups.length + 1;

    const match = definition.match(DEFINITION_MATCHER);
    this.units = +match[1];
    this.hp = +match[2];
    this.damage = +match[4];
    this.damageType = match[5];
    this.initiative = +match[6];

    this.weaknesses = [];
    this.immunities = [];

    const effectivities = match[3];
    if (effectivities) {
      effectivities.split('; ').forEach((effectivity) => {
        const [type, damageTypes] = effectivity.split(' to ');
        if (type === 'weak') {
          this.weaknesses.push(...damageTypes.split(', '));
        } else if (type === 'immune') {
          this.immunities.push(...damageTypes.split(', '));
        }
      });
    }

    this.target = null;
    this.targetedBy = null;
  }

  get active() {
    return this.units > 0;
  }

  get effectivePower() {
    return this.units * (this.damage + this.army.bonusDamage);
  }

  get label() {
    return `${this.army.label} group ${this.id}`;
  }

  effectiveDamageTo(other) {
    const { damageType, effectivePower } = this;
    if (other.immunities.includes(damageType)) {
      return 0;
    }
    if (other.weaknesses.includes(damageType)) {
      return effectivePower * 2;
    }
    return effectivePower;
  }

  attack() {
    const { target } = this;
    if (!target) {
      return;
    }

    const damage = this.effectiveDamageTo(target);
    const unitsLost = Math.min(target.units, Math.floor(damage / target.hp));
    target.units -= unitsLost;
  }

  prepare() {
    let target = null;
    let maxDamage = -Infinity;

    this.army.enemy.activeGroups.forEach((group) => {
      // Prevent targeting an already-targeted group
      if (group.targetedBy) {
        return;
      }

      const damage = this.effectiveDamageTo(group);
      if (!damage) {
        return;
      }

      if (damage > maxDamage) {
        maxDamage = damage;
        target = group;
      } else if (damage === maxDamage) {
        if (group.effectivePower > target.effectivePower) {
          target = group;
        } else if (group.effectivePower === target.effectivePower && group.initiative > target.initiative) {
          target = group;
        }
      }
    });

    this.target = target;
    if (this.target) {
      this.target.targetedBy = this;
    }
  }

  reset() {
    this.target = null;
    this.targetedBy = null;
  }
}

export default Group;
