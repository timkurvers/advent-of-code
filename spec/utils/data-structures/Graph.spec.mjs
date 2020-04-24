/* eslint-disable object-curly-newline */

import {
  Graph,
  GraphEdge,
  GraphVertex,
  Grid,
  stripIndent,
} from '../../../utils';

describe('Graph', () => {
  describe('constructor', () => {
    it('creates an empty graph with default edge and vertex classes', () => {
      const graph = new Graph();
      expect(graph.edges.length).toEqual(0);
      expect(graph.vertices.length).toEqual(0);
      expect(graph.edgeClass).toBeInstanceOf(Function);
      expect(graph.vertexClass).toBeInstanceOf(Function);
    });

    it('supports a custom edge class', () => {
      class CustomEdge extends GraphEdge {
        constructor(...args) {
          super(...args);
          this.custom = true;
        }
      }

      const graph = new Graph({ edgeClass: CustomEdge });
      const a = Symbol();
      const b = Symbol();
      const edge = graph.edge(a, b, { cost: 1 });
      expect(edge).toEqual({
        from: expect.any(GraphVertex),
        to: expect.any(GraphVertex),
        cost: 1,
        custom: true,
      });
    });

    it('supports a custom vertex class', () => {
      class CustomVertex extends GraphVertex {
        constructor(...args) {
          super(...args);
          this.custom = true;
        }
      }

      const graph = new Graph({ vertexClass: CustomVertex });
      const value = Symbol();
      const vertex = graph.lookup(value);
      expect(vertex).toEqual({
        value,
        edges: [],
        custom: true,
      });
    });
  });

  describe('Edge', () => {
    describe('constructor', () => {
      const a = Symbol();
      const b = Symbol();

      it('creates a new edge between given vertices with options', () => {
        const cost = 1;
        const edge = new GraphEdge(a, b, { cost });
        expect(edge.from).toBe(a);
        expect(edge.to).toBe(b);
        expect(edge.cost).toEqual(cost);
      });

      it('defaults cost when omitted', () => {
        const edge = new GraphEdge(a, b);
        expect(edge.cost).toEqual(0);
      });
    });
  });

  describe('Vertex', () => {
    describe('constructor', () => {
      it('creates a new vertex with given value and no edges', () => {
        const value = Symbol();
        const vertex = new GraphVertex(value);
        expect(vertex.value).toBe(value);
        expect(vertex.edges).toEqual([]);
      });

      it('defaults value when omitted', () => {
        const vertex = new GraphVertex();
        expect(vertex.value).toBeNull();
      });
    });

    describe('edge()', () => {
      it('finds edge towards given vertex, creates if non-existent ', () => {
        const a = new GraphVertex('a');
        const b = new GraphVertex('b');
        const edge = a.edge(b, { cost: 1 });
        expect(edge).toEqual({
          from: a,
          to: b,
          cost: 1,
        });
        expect(a.edge(b)).toBe(edge);
      });
    });
  });

  describe('get vertices', () => {
    it('returns all vertices in graph', () => {
      const graph = new Graph();
      const a = graph.lookup('a');
      const b = graph.lookup('b');
      expect(graph.vertices).toEqual([a, b]);
    });
  });

  describe('get edges', () => {
    it('returns all edges in graph', () => {
      const graph = new Graph();
      const ab = graph.edge('a', 'b');
      const ac = graph.edge('a', 'c');
      const ba = graph.edge('b', 'a');
      expect(graph.edges).toEqual([ab, ac, ba]);
    });
  });

  describe('find()', () => {
    const graph = new Graph();
    const a = graph.lookup('a');
    const b = graph.lookup('b');
    const stray = new GraphVertex('c');

    it('finds vertex by given reference', () => {
      expect(graph.find(a)).toBe(a);
      expect(graph.find(b)).toBe(b);
      expect(graph.find(stray)).toBeUndefined();
    });

    it('finds vertex by given value', () => {
      expect(graph.find('a')).toBe(a);
      expect(graph.find('b')).toBe(b);
      expect(graph.find('c')).toBeUndefined();
    });

    it('finds vertex by given condition', () => {
      expect(graph.find((v) => v.value === 'a')).toBe(a);
      expect(graph.find((v) => v.value === 'b')).toBe(b);
      expect(graph.find((v) => v.value === 'c')).toBeUndefined();
    });
  });

  describe('lookup()', () => {
    it('looks up vertex for given value, creates if non-existent', () => {
      const graph = new Graph();
      const value = Symbol();
      const vertex = graph.lookup(value);
      expect(vertex).toEqual({
        value,
        edges: [],
      });
      expect(graph.lookup(value)).toBe(vertex);
    });

    it('looks up given vertex, adds if not yet part of the graph', () => {
      const graph = new Graph();
      const value = Symbol();
      const vertex = new GraphVertex(value);
      expect(graph.lookup(vertex)).toBe(vertex);
      expect(graph.find(vertex)).toBe(vertex);
    });
  });

  describe('edge()', () => {
    it('creates edge between vertices with given values', () => {
      const graph = new Graph();
      const edge = graph.edge('a', 'b', { cost: 1 });
      const a = graph.find('a');
      const b = graph.find('b');
      expect(edge).toEqual({
        from: a,
        to: b,
        cost: 1,
      });
    });

    it('creates edge between given vertices', () => {
      const graph = new Graph();
      const a = new GraphVertex('a');
      const b = new GraphVertex('b');
      const edge = graph.edge(a, b, { cost: 1 });
      expect(edge).toEqual({
        from: a,
        to: b,
        cost: 1,
      });
      expect(graph.find('a')).toBe(a);
      expect(graph.find('b')).toBe(b);
    });
  });

  describe('link()', () => {
    it('creates edges between vertices with given values', () => {
      const graph = new Graph();
      const edges = graph.link('a', 'b', { cost: 1 });
      const a = graph.find('a');
      const b = graph.find('b');
      expect(edges).toEqual([
        { from: a, to: b, cost: 1 },
        { from: b, to: a, cost: 1 },
      ]);
    });

    it('creates edges between given vertices', () => {
      const graph = new Graph();
      const a = new GraphVertex('a');
      const b = new GraphVertex('b');
      const edges = graph.link(a, b, { cost: 1 });
      expect(edges).toEqual([
        { from: a, to: b, cost: 1 },
        { from: b, to: a, cost: 1 },
      ]);
      expect(graph.find('a')).toBe(a);
      expect(graph.find('b')).toBe(b);
    });
  });

  describe('static from()', () => {
    const grid = Grid.from(stripIndent`
      S...#.
      .##X#.
      ....#.
      .##.#.
      .G..#I
    `);

    it('creates a graph from given grid', () => {
      const graph = Graph.from(grid, {
        isVertex: (point) => point.value >= 'A' && point.value <= 'Z',
        neighborsFor: (current) => (
          current.adjacentNeighbors.filter((point) => point.value !== '#')
        ),
      });

      const [s, x, g, i] = graph.vertices;

      expect(s.value).toEqual('S');
      expect(x.value).toEqual('X');
      expect(g.value).toEqual('G');
      expect(i.value).toEqual('I');

      expect(graph.edgeClass).toBe(GraphEdge);
      expect(graph.vertexClass).toBe(GraphVertex);
      expect(graph.edges).toEqual([
        { from: s, to: x, cost: 4 },
        { from: s, to: g, cost: 5 },
        { from: x, to: s, cost: 4 },
        { from: x, to: g, cost: 5 },
        { from: g, to: s, cost: 5 },
        { from: g, to: x, cost: 5 },
      ]);
    });

    it('augments edges with path between vertices', () => {
      const graph = Graph.from(grid, {
        isVertex: (point) => point.value >= 'S' && point.value <= 'X',
        neighborsFor: (current) => (
          current.adjacentNeighbors.filter((point) => point.value !== '#')
        ),
      });

      const [sx, xs] = graph.edges;

      const path = [
        { x: 0, y: 0, value: 'S' },
        { x: 1, y: 0, value: '.' },
        { x: 2, y: 0, value: '.' },
        { x: 3, y: 0, value: '.' },
        { x: 3, y: 1, value: 'X' },
      ];

      expect(sx.path).toEqual(path);
      expect(xs.path).toEqual(path.slice().reverse());
    });

    it('supports custom vertex to point function', () => {
      const graph = Graph.from(grid, {
        vertexForPoint: (point, g) => {
          if (point.value < 'G' || point.value > 'S') {
            return null;
          }
          return g.lookup(new GraphVertex(`${point.value}+`));
        },
        neighborsFor: (current) => (
          current.adjacentNeighbors.filter((point) => point.value !== '#')
        ),
      });

      const [s, g, i] = graph.vertices;

      expect(s.value).toEqual('S+');
      expect(g.value).toEqual('G+');
      expect(i.value).toEqual('I+');

      expect(graph.edges).toEqual([
        { from: s, to: g, cost: 5 },
        { from: g, to: s, cost: 5 },
      ]);
    });

    it('supports custom edge and vertex classes', () => {
      class CustomEdge extends GraphEdge {
        constructor(...args) {
          super(...args);
          this.custom = true;
        }
      }

      class CustomVertex extends GraphVertex {
        constructor(...args) {
          super(...args);
          this.custom = true;
        }
      }

      const graph = Graph.from(grid, {
        isVertex: (point) => point.value >= 'A' && point.value <= 'Z',
        neighborsFor: (current) => (
          current.adjacentNeighbors.filter((point) => point.value !== '#')
        ),
        edgeClass: CustomEdge,
        vertexClass: CustomVertex,
      });

      const [s, x, g, i] = graph.vertices;

      expect(s.custom).toBe(true);
      expect(x.custom).toBe(true);
      expect(g.custom).toBe(true);
      expect(i.custom).toBe(true);

      expect(graph.edgeClass).toBe(CustomEdge);
      expect(graph.vertexClass).toBe(CustomVertex);
      expect(graph.edges).toEqual([
        { from: s, to: x, cost: 4, custom: true },
        { from: s, to: g, cost: 5, custom: true },
        { from: x, to: s, cost: 4, custom: true },
        { from: x, to: g, cost: 5, custom: true },
        { from: g, to: s, cost: 5, custom: true },
        { from: g, to: x, cost: 5, custom: true },
      ]);
    });
  });
});
