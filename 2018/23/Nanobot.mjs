class Nanobot {
  constructor(x, y, z, radius) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.radius = radius;
  }

  get label() {
    return `(${this.x},${this.y},${this.z})`;
  }

  // TODO: Refactor into navigation utility
  distanceTo(other) {
    return Math.abs(other.x - this.x)
           + Math.abs(other.y - this.y)
           + Math.abs(other.z - this.z);
  }

  inRange(other) {
    return this.distanceTo(other) <= this.radius;
  }

  static from(input) {
    return input.split('\n').map((definition) => {
      const match = definition.match(/-?\d+/g);
      const x = +match[0];
      const y = +match[1];
      const z = +match[2];
      const radius = +match[3];
      return new this(x, y, z, radius);
    });
  }
}

export default Nanobot;
