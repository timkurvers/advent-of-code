class Asteroid {
  constructor(field, x, y) {
    this.field = field;
    this.x = x;
    this.y = y;
  }

  angleTo(other) {
    const dy = this.y - other.y;
    const dx = this.x - other.x;
    return Math.atan2(dy, dx);
  }

  get seenCount() {
    return this.seen.size;
  }

  // TODO: Does not necessarily return directly visible asteroids
  get seen() {
    const seen = new Set();
    for (const other of this.field) {
      if (this === other) {
        continue;
      }
      const angle = this.angleTo(other);
      seen.add(angle);
    }
    return seen;
  }
}

export default Asteroid;
