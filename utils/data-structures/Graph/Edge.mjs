class Edge {
  constructor(from, to, { path = null, cost = 0 } = {}) {
    this.from = from;
    this.to = to;
    this.cost = cost;

    Object.defineProperty(this, 'path', {
      enumerable: false,
      value: path,
    });
  }
}

export default Edge;
