/* eslint-disable quote-props */

import colors from 'colors';

import Coord from './Coord.js';
import { Elf, Goblin, Unit, Wall } from './entities/index.js';

const CHAR_MAPPINGS = {
  '#': Wall,
  G: Goblin,
  E: Elf,
  '.': null,
};

class Map {
  constructor(gfx) {
    this.units = [];
    this.graveyard = [];
    this.grid = this.parse(gfx);
    this.width = this.grid[0].length;
    this.height = this.grid.length;
    this.round = 0;
  }

  get unitsInOrder() {
    return this.units.sort((a, b) => {
      if (a.coord.y < b.coord.y) {
        return -1;
      }
      if (b.coord.y < a.coord.y) {
        return 1;
      }
      if (a.coord.x > b.coord.x) {
        return 1;
      }
      if (b.coord.x > a.coord.x) {
        return -1;
      }
      return 0;
    });
  }

  death(deceased) {
    this.units = this.units.filter((unit) => unit !== deceased);
    this.graveyard.push(deceased);
  }

  parse(gfx) {
    const lines = gfx.split('\n');
    return lines.map((line, y) => {
      const row = line.split('').map((char, x) => {
        const coord = new Coord(this, x, y);
        const Type = CHAR_MAPPINGS[char];
        const entity = Type ? new Type(this, coord) : null;
        if (entity instanceof Unit) {
          this.units.push(entity);
        }
        return coord;
      });
      return row;
    });
  }

  get visual() {
    const overview = this.grid
      .map((row) =>
        row
          .map(({ entity }) => {
            if (!entity) return ' ';
            if (entity instanceof Wall) return '#';
            if (entity instanceof Goblin) return colors.red(entity.id);
            return colors.green(entity.id);
          })
          .join(''),
      )
      .join('\n');
    return overview;
  }

  step() {
    for (const unit of this.unitsInOrder) {
      unit.act();
    }
    ++this.round;
  }
}

export default Map;
