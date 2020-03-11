import { Grid } from '../../utils';

const Type = {
  OPEN_SPACE: true,
  WALL: false,
};

class Maze extends Grid {
  constructor(seed) {
    super();
    this.seed = seed;
  }

  getPoint(x, y) {
    let point = super.getPoint(x, y);
    if (!point) {
      point = this.set(x, y);
    }
    return point;
  }

  set(x, y) {
    const point = super.set(x, y);

    const base = x * x + 3 * x + 2 * x * y + y + y * y;
    const sum = base + this.seed;
    const ones = sum.toString(2).split('').filter((char) => char === '1');
    const even = ones.length % 2 === 0;
    const value = even ? Type.OPEN_SPACE : Type.WALL;

    point.value = value;
    return point;
  }
}

export default Maze;
export { Type };
