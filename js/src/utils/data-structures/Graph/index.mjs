/* eslint-disable no-param-reassign */

import { bfs } from '../..';

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

  static from(grid, {
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
        if (a === b) {
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
