const LEFT_TURN = -Math.PI * 0.5;
const RIGHT_TURN = Math.PI * 0.5;
const STRAIGHT_AHEAD = 0;

const INTERSECTION_OPTIONS = [
  LEFT_TURN,
  STRAIGHT_AHEAD,
  RIGHT_TURN,
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
        this.angle = 0;
        break;
      case '^':
        this.angle = -Math.PI * 0.5;
        break;
      case '<':
        this.angle = Math.PI;
        break;
      case 'v':
        this.angle = -Math.PI * 1.5;
        break;
    }
  }

  get dx() {
    return Math.round(Math.cos(this.angle));
  }

  get dy() {
    return Math.round(Math.sin(this.angle));
  }

  next(mine) {
    const char = mine.grid[this.y][this.x];

    let change;
    switch (char) {
      case '/':
        if (this.dx !== 0) {
          change = LEFT_TURN;
        } else {
          change = RIGHT_TURN;
        }
        break;
      case '\\':
        if (this.dx !== 0) {
          change = RIGHT_TURN;
        } else {
          change = LEFT_TURN;
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

    const x = this.x + this.dx;
    const y = this.y + this.dy;

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
