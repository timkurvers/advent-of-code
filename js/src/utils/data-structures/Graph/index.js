/* eslint-disable no-param-reassign */

import { bfs } from '../../index.js';

import Edge from './Edge.js';
import Vertex from './Vertex.js';

class Graph {
  constructor({ edgeClass = Edge, vertexClass = Vertex } = {}) {
    this.vertices = [];
    this.edgeClass = edgeClass;
    this.vertexClass = vertexClass;
  }

  get edges() {
    return this.vertices.flatMap((vertex) => vertex.edges);
  }

  find(condition) {
    if (!(condition instanceof Function)) {
      const value = condition;
      condition = (vertex) => vertex === value || vertex.value === value;
    }
    return this.vertices.find(condition);
  }

  lookup(value) {
    const { vertexClass: VertexClass } = this;

    let vertex = this.find(value);
    if (!vertex) {
      vertex = value instanceof VertexClass ? value : new VertexClass(value);
      this.vertices.push(vertex);
    }
    return vertex;
  }

  edge(a, b, options) {
    const from = this.lookup(a);
    const to = this.lookup(b);
    return from.edge(to, { class: this.edgeClass, ...options });
  }

  link(a, b, options) {
    return [
      this.edge(a, b, options),
      this.edge(b, a, options),
    ];
  }

  floydwarshall() {
    const { vertices } = this;

    // Initialize the matrix with each vertex's distance to another
    const matrix = vertices.reduce((map, vertex) => {
      const inner = new Map();
      for (const other of vertices) {
        inner.set(other, other === vertex ? 0 : Infinity);
      }
      map.set(vertex, inner);
      return map;
    }, new Map());

    // Apply all edges
    for (const edge of this.edges) {
      matrix.get(edge.from).set(edge.to, edge.cost);
    }

    // See: https://en.wikipedia.org/wiki/Floyd%E2%80%93Warshall_algorithm
    for (const k of vertices) {
      for (const i of vertices) {
        const inner = matrix.get(i);
        for (const j of vertices) {
          const itoj = inner.get(j);
          const itok = inner.get(k);
          const ktoj = matrix.get(k).get(j);
          if (itoj > itok + ktoj) {
            inner.set(j, itok + ktoj);
          }
        }
      }
    }

    return matrix;
  }

  simplify({ keep } = {}) {
    const distances = this.floydwarshall();

    this.vertices = this.vertices.reduce((vertices, vertex) => {
      if (keep(vertex)) {
        vertex.edges = [];

        for (const [to, cost] of distances.get(vertex)) {
          if (vertex !== to && keep(to)) {
            vertex.edge(to, { cost, class: this.edgeClass });
          }
        }

        vertices.push(vertex);
      }
      return vertices;
    }, []);

    return this;
  }

  static from(grid, {
    isValidEdge = () => true,
    isVertex,
    vertexForPoint = (point, graph) => (
      isVertex(point) && graph.lookup(point.value)
    ),
    ...options
  }) {
    const {
      edgeClass,
      vertexClass,
      ...bfsOptions
    } = options;

    const graph = new this({ edgeClass, vertexClass });
    const vps = grid.map((point) => {
      const vertex = vertexForPoint(point, graph);
      return vertex && { point, vertex };
    }).filter(Boolean);

    for (const a of vps) {
      for (const b of vps) {
        if (a === b || !isValidEdge(a, b, graph)) {
          continue;
        }

        const { path } = bfs(a.point, b.point, bfsOptions);
        if (!path) {
          continue;
        }

        const edge = graph.edge(a.vertex, b.vertex, { cost: path.length - 1 });

        // Augment edge with the path between these vertices
        Object.defineProperty(edge, 'path', {
          enumerable: false,
          value: path,
        });
      }
    }

    return graph;
  }
}

export default Graph;
export { Edge as GraphEdge };
export { Vertex as GraphVertex };
