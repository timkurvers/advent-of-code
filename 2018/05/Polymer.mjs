const opposites = (a, b) => (
  a && b && Math.abs(a.charCodeAt(0) - b.charCodeAt(0)) === 32
);

const match = (a, b) => (
  a === b || opposites(a, b)
);

class Polymer {
  constructor(units) {
    this.units = units;
  }

  get uniqueUnits() {
    const letters = new Set();
    this.units.forEach(unit => letters.add(unit.toLowerCase()));
    return Array.from(letters).sort();
  }

  without(exclude) {
    return new this.constructor(
      this.units.filter(unit => !match(unit, exclude)),
    );
  }

  react() {
    const { units } = this;
    const result = [];

    let i = -1;
    units.forEach((unit) => {
      result.push(unit);
      ++i;
      if (opposites(result[i - 1], result[i])) {
        result.pop();
        result.pop();
        i -= 2;
      }
    });
    return result;
  }

  static fromString(input) {
    return new this(input.split(''));
  }
}

export default Polymer;
