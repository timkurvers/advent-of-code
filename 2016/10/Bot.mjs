import { sum } from '../../utils';

class Bot {
  constructor(id) {
    this.id = id;
    this.chips = [];
  }

  get low() {
    return this.chips[0];
  }

  get high() {
    return this.chips[this.chips.length - 1];
  }

  get nr() {
    return +this.id.match(/\d+/);
  }

  get value() {
    return sum(this.chips);
  }

  give(chip) {
    this.chips.push(chip);
    this.chips.sort((a, b) => a - b);
  }

  deplete() {
    this.chips.length = 0;
  }
}

export default Bot;
