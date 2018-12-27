import { sum } from '../../utils';

class Army {
  constructor(label) {
    this.label = label;
    this.groups = [];
    this.enemy = null;
    this.bonusDamage = 0;
  }

  get activeGroups() {
    return this.groups.filter(group => group.active);
  }

  get defeated() {
    return this.activeGroups.length === 0;
  }

  get units() {
    return sum(this.groups.map(group => group.units));
  }
}

export default Army;
