class Equipment {
  constructor(name, cost, damage, armor) {
    this.name = name;
    this.cost = cost;
    this.damage = damage;
    this.armor = armor;
  }

  get type() {
    return this.constructor;
  }
}

class Armor extends Equipment {}
class Ring extends Equipment {}
class Weapon extends Equipment {}

export default Equipment;
export { Armor, Ring, Weapon };
