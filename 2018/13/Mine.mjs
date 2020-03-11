/* eslint-disable quote-props */

import Cart from './Cart';

const CART_REPLACEMENTS = {
  '>': '-',
  '<': '-',
  'v': '|',
  '^': '|',
};

class Mine {
  constructor(gfx) {
    this.carts = [];
    this.grid = this.parse(gfx);
    this.cleanUpCrashes = false;
  }

  get cartsInOrder() {
    return this.carts.sort((a, b) => {
      if (a.y < b.y) {
        return -1;
      }
      if (b.y < a.y) {
        return 1;
      }
      if (a.x > b.x) {
        return 1;
      }
      if (b.x > a.x) {
        return -1;
      }
      return 0;
    });
  }

  cartAt(x, y) {
    return this.carts.find((cart) => cart.x === x && cart.y === y);
  }

  parse(gfx) {
    const lines = gfx.split('\n');
    return lines.map((line, y) => {
      const row = line.split('').map((char, x) => {
        const replacement = CART_REPLACEMENTS[char];
        if (replacement) {
          this.carts.push(new Cart(x, y, char));
          return replacement;
        }
        return char;
      });
      return row;
    });
  }

  step() {
    for (const cart of this.cartsInOrder) {
      try {
        cart.next(this);
      } catch (crash) {
        if (this.cleanUpCrashes) {
          this.carts = this.carts.filter((c) => (
            c !== crash.cart && c !== crash.otherCart
          ));
        } else {
          throw crash;
        }
      }
    }
  }
}

export default Mine;
