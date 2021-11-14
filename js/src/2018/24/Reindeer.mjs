import Army from './Army';
import Group from './Group';

const DRAW = Symbol('draw');

class Reindeer {
  constructor(input) {
    this.immuneSystem = new Army('Immune System');
    this.infection = new Army('Infection');

    this.immuneSystem.enemy = this.infection;
    this.infection.enemy = this.immuneSystem;

    let army;
    input.split('\n').forEach((line) => {
      if (!line) return;
      if (line === 'Immune System:') {
        army = this.immuneSystem;
        return;
      }
      if (line === 'Infection:') {
        army = this.infection;
        return;
      }
      army.groups.push(new Group(army, line));
    });
  }

  get activeGroups() {
    return [
      ...this.immuneSystem.activeGroups,
      ...this.infection.activeGroups,
    ];
  }

  get units() {
    return this.immuneSystem.units + this.infection.units;
  }

  step() {
    const { activeGroups, units } = this;

    // Reset groups
    activeGroups.forEach((group) => {
      group.reset();
    });

    // Preparation phase (sorted by effective power and initiative)
    activeGroups.sort((a, b) => {
      let diff = b.effectivePower - a.effectivePower;
      if (!diff) {
        diff = b.initiative - a.initiative;
      }
      return diff;
    }).forEach((group) => group.prepare());

    // Attack phase (sorted by initiative)
    activeGroups.sort((a, b) => (
      b.initiative - a.initiative
    )).forEach((group) => group.attack());

    // Army defeat clause
    if (this.immuneSystem.defeated) {
      return this.infection;
    }
    if (this.infection.defeated) {
      return this.immuneSystem;
    }
    if (this.units === units) {
      return DRAW;
    }
    return null;
  }
}

export default Reindeer;
export { DRAW };
