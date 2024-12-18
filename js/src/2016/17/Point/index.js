import { GridPoint } from '../../../utils/index.js';

import PointWithPath from './WithPath.js';

class Point extends GridPoint {
  constructor(...args) {
    super(...args);
    this._withPaths = new Map();
  }

  withPath(path = '') {
    let withPath = this._withPaths.get(path);
    if (!withPath) {
      withPath = new PointWithPath(this, path);
      this._withPaths.set(path, withPath);
    }
    return withPath;
  }
}

export default Point;
