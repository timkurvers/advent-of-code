import { Grid, identity } from '../../utils/index.js';

class Diagram extends Grid {
  static from(...args) {
    const diagram = super.from(...args);
    diagram.start = diagram.find(identity);
    return diagram;
  }
}

export default Diagram;
