import { sum } from '../../utils';

class Present {
  constructor(length, width, height) {
    this.length = length;
    this.width = width;
    this.height = height;
  }

  get areas() {
    return this.sides.map(([a, b]) => (
      2 * a * b
    ));
  }

  get ribbon() {
    const wraps = this.sides.map(sum);
    const shortest = Math.min(...wraps);
    return shortest * 2 + this.volume;
  }

  get sides() {
    const { length, width, height } = this;
    return [
      [length, width],
      [width, height],
      [height, length],
    ];
  }

  get volume() {
    const { length, width, height } = this;
    return length * width * height;
  }

  get wrapping() {
    const { areas } = this;
    const extra = Math.min(...areas) / 2;
    return sum(areas) + extra;
  }

  static from(input) {
    return input.split('\n').map((line) => (
      new this(...line.split('x').map(Number))
    ));
  }
}

export default Present;
