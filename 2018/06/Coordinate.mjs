let ord = 65;

class Coordinate {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.letter = String.fromCharCode(ord++);
    this.area = 0;
    this.infinite = false;
  }

  get label() {
    return `(${this.x},${this.y})`;
  }

  // TODO: Refactor into navigation utility
  distanceTo(x, y) {
    return Math.abs(x - this.x) + Math.abs(y - this.y);
  }
}

export default Coordinate;
