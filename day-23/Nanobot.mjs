class Nanobot {
  constructor(definition) {
    const match = definition.match(/-?\d+/g);
    this.x = +match[0];
    this.y = +match[1];
    this.z = +match[2];
    this.radius = +match[3];
  }

  distanceTo(other) {
    return Math.abs(other.x - this.x)
           + Math.abs(other.y - this.y)
           + Math.abs(other.z - this.z);
  }

  inRange(others) {
    return others.filter(other => (
      this.distanceTo(other) <= this.radius
    ));
  }
}

export default Nanobot;
