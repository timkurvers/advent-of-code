const DEFINITION_REGEXP = /-?\d+/g;

class Star {
  constructor(definition) {
    const match = definition.match(DEFINITION_REGEXP);
    this.x = +match[0];
    this.y = +match[1];
    this.vx = +match[2];
    this.vy = +match[3];
  }

  at(t) {
    return {
      x: this.x + this.vx * t,
      y: this.y + this.vy * t,
    };
  }
}

export default Star;
