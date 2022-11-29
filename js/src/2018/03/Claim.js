const DEFINITION_REGEXP = /#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/;

class Claim {
  constructor(definition) {
    const match = definition.match(DEFINITION_REGEXP);
    this.id = +match[1];
    this.x = +match[2];
    this.y = +match[3];
    this.width = +match[4];
    this.height = +match[5];

    this.contested = false;
  }

  get maxX() {
    return this.x + this.width;
  }

  get maxY() {
    return this.y + this.height;
  }
}

export default Claim;
