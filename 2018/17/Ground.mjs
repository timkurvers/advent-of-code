/* eslint-disable no-param-reassign,prefer-const */

import colors from 'colors';

import Tile, { Type } from './Tile';
import { Grid } from '../../utils';

const AREA_MATCHER = /(x|y)=(\d+)(?:\.\.(\d+))?, (x|y)=(\d+)(?:\.\.(\d+))?/;

class Ground {
  constructor(definition) {
    const lines = definition.split('\n');
    this.areas = lines.map((line) => {
      let [, axis1, x1, x2 = x1,, y1, y2 = y1] = line.match(AREA_MATCHER);
      if (axis1 === 'y') {
        [x1, x2, y1, y2] = [y1, y2, x1, x2];
      }
      return {
        x1: +x1, x2: +x2, y1: +y1, y2: +y2,
      };
    });

    this.minX = Math.min(...this.areas.map(area => area.x1)) - 1;
    this.maxX = Math.max(...this.areas.map(area => area.x2)) + 1;
    this.minY = Math.min(...this.areas.map(area => area.y1));
    this.maxY = Math.max(...this.areas.map(area => area.y2));

    this.tiles = [];
    this.grid = new Grid(Tile);
    for (let y = 0; y <= this.maxY; ++y) {
      for (let x = this.minX; x <= this.maxX; ++x) {
        const tile = this.grid.set(x, y, null);
        this.tiles.push(tile);
      }
    }

    // Mark tiles for all scanned areas as obstructed
    this.areas.forEach((area) => {
      for (let y = area.y1; y <= area.y2; ++y) {
        for (let x = area.x1; x <= area.x2; ++x) {
          this.grid.set(x, y, Type.OBSTRUCTED);
        }
      }
    });

    // Mark spring tile
    const spring = this.grid.getPoint(500, 0);
    spring.type = Type.SPRING;

    // Mark initial water tile and add it as the sole active tile
    const water = spring.down;
    water.type = Type.WATER_FLOWING_DOWN;
    this.activeTiles = [water];
  }

  get eligibleTiles() {
    return this.tiles.filter(tile => (
      tile.y >= this.minY && tile.y <= this.maxY
    ));
  }

  get visual() {
    const overview = this.grid.map(row => (
      row.map((tile) => {
        const { type } = tile;
        let char = ' ';
        if (type === Type.SPRING) char = '+';
        if (type === Type.OBSTRUCTED) char = '#';
        if (type === Type.WATER_STILL) char = '~';
        if (type === Type.WATER_FLOWING_DOWN) char = '|';
        if (type === Type.WATER_FLOWING_LEFT) char = '<';
        if (type === Type.WATER_FLOWING_RIGHT) char = '>';
        if (this.activeTiles.includes(tile)) {
          return colors.green(char);
        }
        return char;
      }).join('')
    )).join('\n');
    return overview;
  }

  step() {
    const next = [];

    for (const tile of this.activeTiles) {
      const { down, left, right } = tile;
      if (tile.type === Type.WATER_FLOWING_DOWN && down) {
        // Just keep flowing down
        if (!down.type) {
          down.type = Type.WATER_FLOWING_DOWN;
          next.push(down);
        }

        // Water flowing down has hit an obstruction or still water
        if (down.type === Type.OBSTRUCTED || down.type === Type.WATER_STILL) {
          // Water splits to the left
          if (!left.type) {
            // When dropping of an edge, otherwise just keep flowing left
            if (!left.down.type) {
              left.type = Type.WATER_FLOWING_DOWN;
            } else {
              left.type = Type.WATER_FLOWING_LEFT;
            }
            next.push(left);
          }

          // Water splits to the right
          if (!right.type) {
            // When dropping of an edge, otherwise just keep flowing right
            if (!right.down.type) {
              right.type = Type.WATER_FLOWING_DOWN;
            } else {
              right.type = Type.WATER_FLOWING_RIGHT;
            }
            next.push(right);
          }

          // Water is trapped and is turned into still water
          if (left.type === Type.OBSTRUCTED && right.type === Type.OBSTRUCTED) {
            tile.type = Type.WATER_STILL;
            next.push(tile.up);
          }
        }
      } else if (tile.type === Type.WATER_FLOWING_LEFT) {
        if (!left.type) {
          // When dropping of an edge, otherwise just keep flowing left
          if (!left.down.type) {
            left.type = Type.WATER_FLOWING_DOWN;
          } else {
            left.type = Type.WATER_FLOWING_LEFT;
          }
          next.push(left);
        }

        // Left-flowing water hit an obstruction
        if (left.type === Type.OBSTRUCTED) {
          let current = tile;
          const body = [];
          do {
            body.push(current);
            if (!current.right) {
              break;
            }
            current = current.right;
          } while (current.isWater);

          // Hit another obstruction on the other end; turn body of water into
          // still water as it is fully contained
          if (current.type === Type.OBSTRUCTED) {
            for (const water of body) {
              water.type = Type.WATER_STILL;
              next.push(water.up);
            }

          // For multiple streams of water moving towards each-other, make sure
          // these edge tiles are kept active until still water is ruled out
          } else if (!current.type && current.down.type) {
            next.push(tile);
          }
        }
      } else if (tile.type === Type.WATER_FLOWING_RIGHT) {
        if (!right.type) {
          // When dropping of an edge, otherwise just keep flowing right
          if (!right.down.type) {
            right.type = Type.WATER_FLOWING_DOWN;
          } else {
            right.type = Type.WATER_FLOWING_RIGHT;
          }
          next.push(right);
        }

        // Right-flowing water hit an obstruction
        if (right.type === Type.OBSTRUCTED) {
          let current = tile;
          const body = [];
          do {
            body.push(current);
            if (!current.left) {
              break;
            }
            current = current.left;
          } while (current.isWater);

          // Hit another obstruction on the other end; turn body of water into
          // still water as it is fully contained
          if (current.type === Type.OBSTRUCTED) {
            for (const water of body) {
              water.type = Type.WATER_STILL;
              next.push(water.up);
            }

          // For multiple streams of water moving towards each-other, make sure
          // these edge tiles are kept active until still water is ruled out
          } else if (!current.type && current.down.type) {
            next.push(tile);
          }
        }
      }
    }

    this.activeTiles = next;
  }
}

export default Ground;
