let i = 0;

class Constellation {
  constructor() {
    this.id = ++i;
    this.points = new Set();
  }
}

export default Constellation;
