/* eslint-disable no-cond-assign, no-loop-func */

import { Grid, dx, dy, multiply, solution, stripIndent } from '../../utils/index.js';

import Tile from './Tile.js';

const SEA_MONSTER = Grid.from(stripIndent`
                  #
#    ##    ##    ###
 #  #  #  #  #  #
`);

const parse = (input) =>
  input.split('\n\n').map((raw) => {
    const parts = raw.split(':\n');
    const id = +parts[0].slice(4);
    const grid = Grid.from(parts[1]);
    return new Tile(id, grid);
  });

// Prepares a jigsaw blueprint (a grid of tiles)
const prepare = (tiles) => {
  const blueprint = new Grid();

  // Start with an arbitrary tile at (0, 0) in the blueprint, resolve its sides
  // to connecting tiles, and then schedule those tiles for processing in turn
  let [current] = tiles;
  blueprint.set(0, 0, current);

  const frontier = [current];
  while ((current = frontier.pop())) {
    // Find current tile position in blueprint
    const { x: cx, y: cy } = blueprint.find((point) => point.value === current);

    for (const other of tiles) {
      const side = current.connect(other);
      if (!side) {
        continue;
      }

      // Found a connection with another tile, place it in the blueprint at the
      // position indicated by the side's orientation
      const direction = side.orientation;
      const x = cx + dx(direction);
      const y = cy + dy(direction);
      blueprint.set(x, y, other);

      if (!other.resolved) {
        frontier.push(other);
      }
    }
  }
  return blueprint;
};

// Assembles jigsaw from given blueprint
const assemble = (blueprint, { borders = false } = {}) => {
  const jigsaw = new Grid();
  for (const { x: tx, y: ty, value: tile } of blueprint) {
    let { width: size } = tile.grid;
    if (!borders) {
      size -= 2;
    } else {
      size += 1;
    }
    for (const { x, y, value } of tile.grid) {
      if (!borders && (x === 0 || x === 9 || y === 0 || y === 9)) {
        continue;
      }
      jigsaw.set(tx * size + x, ty * size + y, value);
    }
  }
  return jigsaw;
};

// Whether given point is start of a sea monster, returns body (if so) or null
const detectSeaMonster = (start) => {
  const body = [];
  for (const offset of SEA_MONSTER.points) {
    const point = start.grid.getPoint(start.x + offset.x, start.y + offset.y);
    if (!point || point.value !== '#') {
      return null;
    }
    body.push(point);
  }
  return body;
};

// Rotates / flips given jigsaw grid until sea monsters are found and marked
const findSeaMonsters = (jigsaw) => {
  const seaMonsters = [];
  for (const start of jigsaw) {
    const seaMonster = detectSeaMonster(start);
    if (seaMonster) {
      seaMonsters.push(seaMonster);
    }
  }
  return seaMonsters;
};

export const partOne = solution((input) => {
  const tiles = parse(input);
  prepare(tiles);
  const corners = tiles.filter((tile) => tile.isCorner);
  return multiply(corners.map((tile) => tile.id));
});

export const partTwo = solution((input) => {
  const tiles = parse(input);
  const blueprint = prepare(tiles);

  // Assemble that damned jigsaw puzzle!
  const jigsaw = assemble(blueprint);

  // Find sea monsters, executing jigsaw operations as long as none are found
  const operations = ['rotate', 'rotate', 'rotate', 'flipX', 'rotate', 'rotate', 'rotate'];
  let seaMonsters = findSeaMonsters(jigsaw);
  while (!seaMonsters.length) {
    const operation = operations.shift();
    jigsaw[operation]();
    seaMonsters = findSeaMonsters(jigsaw);
  }

  // Mark points that are part of a sea monster
  for (const seaMonster of seaMonsters) {
    for (const point of seaMonster) {
      point.value = 'O';
    }
  }
  return jigsaw.values.filter((value) => value === '#').length;
});
