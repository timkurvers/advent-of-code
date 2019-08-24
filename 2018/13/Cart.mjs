import {
  Orientation,
  Rotation,
  isHorizontalOrientation,
  dx,
  dy,
} from '../../utils';

const INTERSECTION_OPTIONS = [
  Rotation.TURN_LEFT,
  Rotation.NONE,
  Rotation.TURN_RIGHT,
];

let ord = 65;

class Cart {
  constructor(x, y, char) {
    this.x = x;
    this.y = y;
    this.intersection = 0;
    this.id = String.fromCharCode(ord++);

    switch (char) {
      default:
      case '>':
        this.angle = Orientation.RIGHT;
        break;
      case '^':
        this.angle = Orientation.UP;
        break;
      case '<':
        this.angle = Orientation.LEFT;
        break;
      case 'v':
        this.angle = Orientation.DOWN;
        break;
    }
  }

  next(mine) {
    const char = mine.grid[this.y][this.x];

    let change;
    switch (char) {
      case '/':
        if (isHorizontalOrientation(this.angle)) {
          change = Rotation.TURN_LEFT;
        } else {
          change = Rotation.TURN_RIGHT;
        }
        break;
      case '\\':
        if (isHorizontalOrientation(this.angle)) {
          change = Rotation.TURN_RIGHT;
        } else {
          change = Rotation.TURN_LEFT;
        }
        break;
      case '+': {
        const options = INTERSECTION_OPTIONS;
        change = options[this.intersection % options.length];
        this.intersection++;
        break;
      }
      case '-':
      case '|':
        break;
      default:
        // Should never happen (famous last words)
    }

    if (change) {
      this.angle += change;
    }

    const x = this.x + dx(this.angle);
    const y = this.y + dy(this.angle);

    const otherCart = mine.cartAt(x, y);
    if (otherCart) {
      const crash = new Error('Crash!');
      crash.targetX = x;
      crash.targetY = y;
      crash.cart = this;
      crash.otherCart = otherCart;
      throw crash;
    }

    this.x = x;
    this.y = y;
  }
}

export default Cart;
