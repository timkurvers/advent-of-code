import { distance3D } from '../../utils/navigation.js';

import Constellation from './Constellation.js';

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
    return distance3D(
      this.x, this.y, this.z, other.x, other.y, other.z,
    ) + Math.abs(this.t - other.t);
  }
}

export default Point;
