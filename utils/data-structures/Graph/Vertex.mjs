class Vertex {
  constructor(value = null) {
    this.value = value;
    this.edges = [];
  }

  edgeTo(other) {
    return this.edges.find((edge) => edge.to === other);
  }
}

export default Vertex;
