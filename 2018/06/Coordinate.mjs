import { distance2D } from '../../utils/navigation';

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

  distanceTo(x, y) {
    return distance2D(this.x, this.y, x, y);
  }
}

export default Coordinate;
