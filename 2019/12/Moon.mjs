const MATCHER = /<x=(-?\d+), y=(-?\d+), z=(-?\d+)>/g;

class Moon {
  constructor(x, y, z) {
    this.x = +x;
    this.y = +y;
    this.z = +z;

    this.dx = 0;
    this.dy = 0;
    this.dz = 0;
  }

  get potentialEnergy() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }

  get kineticEnergy() {
    return Math.abs(this.dx) + Math.abs(this.dy) + Math.abs(this.dz);
  }

  get energy() {
    return this.potentialEnergy * this.kineticEnergy;
  }

  static from(input) {
    const matches = Array.from(input.matchAll(MATCHER));
    return matches.map(([, x, y, z]) => new this(x, y, z));
  }
}

export default Moon;
