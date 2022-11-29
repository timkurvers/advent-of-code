import { distance3D } from '../../utils/navigation';

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

  distanceTo(other) {
    return distance3D(this.x, this.y, this.z, other.x, other.y, other.z);
  }

  inRange(other) {
    return this.distanceTo(other) <= this.radius;
  }

  static from(input) {
    return input.trim().split('\n').map((definition) => {
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
