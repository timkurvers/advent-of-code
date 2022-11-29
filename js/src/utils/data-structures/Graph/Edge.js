class Edge {
  constructor(from, to, { cost = 0 } = {}) {
    this.from = from;
    this.to = to;
    this.cost = cost;
  }
}

export default Edge;
