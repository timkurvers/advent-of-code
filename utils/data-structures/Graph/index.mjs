import Edge from './Edge';
import Vertex from './Vertex';

class Graph {
  constructor({ edgeClass = Edge, vertexClass = Vertex } = {}) {
    this.vertices = [];
    this.edgeClass = edgeClass;
    this.vertexClass = vertexClass;
  }

  get edges() {
    return this.vertices.flatMap((vertex) => vertex.edges);
  }

  find(value) {
    return this.vertices.find((vertex) => (
      vertex === value || vertex.value === value
    ));
  }

  lookup(value) {
    const { vertexClass: VertexClass } = this;

    let vertex = this.find(value);
    if (!vertex) {
      vertex = new VertexClass(value);
      this.vertices.push(vertex);
    }
    return vertex;
  }

  edge(a, b, options) {
    const { edgeClass: EdgeClass } = this;

    const from = this.lookup(a);
    const to = this.lookup(b);
    const edge = new EdgeClass(from, to, options);
    from.edges.push(edge);
  }

  link(a, b, options) {
    this.edge(a, b, options);
    this.edge(b, a, options);
  }
}

export default Graph;
export { Edge as GraphEdge };
export { Vertex as GraphVertex };
