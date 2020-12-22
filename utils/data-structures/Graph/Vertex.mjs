import Edge from './Edge';

class Vertex {
  constructor(value = null) {
    this.value = value;
    this.edges = [];
  }

  edge(to, { class: EdgeClass = Edge, ...options } = {}) {
    let edge = this.edges.find((other) => other.to === to);
    if (!edge) {
      edge = new EdgeClass(this, to, options);
      this.edges.push(edge);
    }
    return edge;
  }
}

export default Vertex;
