import { hexmd5 } from '../../../utils/index.js';

const isUnlocked = (str) => str > 'a';

class PointWithPath {
  constructor(point, path) {
    this.point = point;
    this.path = path;
  }

  options(passcode) {
    const hash = hexmd5(passcode + this.path);

    const { up, down, left, right } = this.point;

    const options = [];
    if (up && isUnlocked(hash[0])) {
      options.push(up.withPath(`${this.path}U`));
    }
    if (down && isUnlocked(hash[1])) {
      options.push(down.withPath(`${this.path}D`));
    }
    if (left && isUnlocked(hash[2])) {
      options.push(left.withPath(`${this.path}L`));
    }
    if (right && isUnlocked(hash[3])) {
      options.push(right.withPath(`${this.path}R`));
    }
    return options;
  }
}

export default PointWithPath;
