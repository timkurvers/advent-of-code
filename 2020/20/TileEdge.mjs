import { GraphEdge } from '../../utils';

class TileEdge extends GraphEdge {
  constructor(from, to, { side, ...options }) {
    super(from, to, options);
    this.side = side;
  }
}

export default TileEdge;
