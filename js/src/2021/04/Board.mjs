import { Grid, sum } from '../../utils';

const BINGO = 'x';

class Board extends Grid {
  markBingo(nr) {
    for (const point of this) {
      if (point.value === nr) {
        point.value = BINGO;
      }
    }
  }

  get hasBingo() {
    const isBingo = (value) => value === BINGO;

    for (let y = this.minY; y <= this.maxY; ++y) {
      if (this.row(y).every(isBingo)) {
        return true;
      }
    }

    for (let x = this.minX; x <= this.maxX; ++x) {
      if (this.column(x).every(isBingo)) {
        return true;
      }
    }

    return false;
  }

  get score() {
    return sum(this.map(({ value }) => (
      value === BINGO ? 0 : value
    )));
  }
}

export default Board;
