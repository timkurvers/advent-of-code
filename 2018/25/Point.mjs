import Constellation from './Constellation';

class Point {
  constructor(definition) {
    [this.t, this.x, this.y, this.z] = definition.split(',').map(Number);
    this.constellation = new Constellation();
  }

  get constellation() {
    return this._constellation;
  }

  set constellation(constellation) {
    if (this._constellation) {
      this._constellation.points.delete(this);
    }
    this._constellation = constellation;
    if (this._constellation) {
      this._constellation.points.add(this);
    }
  }

  get label() {
    return `(${this.t},${this.x},${this.y},${this.z})`;
  }

  distanceTo(other) {
    return Math.abs(other.t - this.t)
           + Math.abs(other.x - this.x)
           + Math.abs(other.y - this.y)
           + Math.abs(other.z - this.z);
  }
}

export default Point;
