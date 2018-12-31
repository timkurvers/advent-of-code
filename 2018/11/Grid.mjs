class Grid {
  constructor(serialNumber, size = 300) {
    this.serialNumber = +serialNumber;
    this.size = size;

    this.levels = [];
    for (let y = 1; y <= this.size; ++y) {
      this.levels[y] = [];
      for (let x = 1; x <= this.size; ++x) {
        this.levels[y][x] = this.powerLevelAt(x, y);
      }
    }
  }

  powerLevelAt(x, y) {
    const rackID = x + 10;
    let level = rackID * y;
    level += this.serialNumber;
    level *= rackID;
    level = +(level.toString().slice(-3, -2));
    level -= 5;
    return level;
  }

  findMostPowerfulSquareBySize(size) {
    let max = -Infinity;
    let point = null;

    for (let y = 1; y <= this.size - size; ++y) {
      for (let x = 1; x <= this.size - size; ++x) {
        let total = 0;
        for (let sy = y; sy < y + size; ++sy) {
          for (let sx = x; sx < x + size; ++sx) {
            total += this.levels[sy][sx];
          }
        }

        if (total > max) {
          max = total;
          point = [x, y];
        }
      }
    }
    return { max, point, size };
  }

  findMostPowerfulSquare() {
    let top = null;
    for (let size = 1; size <= this.size; ++size) {
      const square = this.findMostPowerfulSquareBySize(size);
      if (!top || square.max > top.max) {
        top = square;
      }
      if (square.max < 0) {
        break;
      }
    }
    return top;
  }
}

export default Grid;
