import {
  Graph, Grid, multiply, reverse, solution,
} from '../../utils';

import TileEdge from './TileEdge';

const parse = (input) => input.split('\n\n').map((raw) => {
  const parts = raw.split(':\n');
  const id = +parts[0].slice(4);
  const grid = Grid.from(parts[1]);

  // Collect all sides of this tile, naming them by their current orientation
  const top = grid.row(0).join('');
  const bottom = grid.row(9).join('');
  const left = grid.column(0).join('');
  const right = grid.column(9).join('');
  const sides = [top, bottom, left, right];

  return { id, grid, sides };
});

// Creates a graph for given set of tiles, representing the tiles with vertices
// and edges represent a connection between two tiles
const create = (tiles) => {
  const graph = new Graph({ edgeClass: TileEdge });
  for (const atile of tiles) {
    const a = graph.lookup(atile);
    for (const btile of tiles) {
      if (atile === btile) continue;
      const b = graph.lookup(btile);
      for (const aside of atile.sides) {
        for (const bside of btile.sides) {
          if (aside === bside || reverse(aside) === bside) {
            graph.link(a, b, { side: aside });
          }
        }
      }
    }
  }
  return graph;
};

export const partOne = solution((input) => {
  const tiles = parse(input);
  const graph = create(tiles);

  // Each corner connects to two other tiles
  const corners = graph.vertices.filter((vertex) => vertex.edges.length === 2);
  return multiply(corners.map((vertex) => vertex.value.id));
});
