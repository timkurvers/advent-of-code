class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  clone() {
    return new this.constructor(
      this.x,
      this.y,
    );
  }
}

export default Point;
