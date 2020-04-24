/* eslint-disable no-param-reassign */

import Coord, { Type } from './Coord';

class Facility {
  constructor(regex) {
    this.start = new Coord(this, 0, 0);

    const coords = [this.start];
    const map = new Map();
    const stack = [this.start];
    this.current = this.start;

    const move = (dx, dy, type) => {
      const x = this.current.x + dx;
      const y = this.current.y + dy;

      let row = map.get(y);
      if (!row) {
        row = new Map();
        map.set(y, row);
      }

      let coord = row.get(x);
      if (!coord) {
        coord = new Coord(this, x, y, type);
        coord.distance = this.current.distance + Math.abs(dx) + Math.abs(dy);
        row.set(x, coord);
        coords.push(coord);
      }
      this.current = coord;
    };

    for (let i = 1; i < regex.length - 1; ++i) {
      switch (regex[i]) {
        case 'N':
          move(0, -1, Type.DOOR);
          move(0, -1, Type.ROOM);
          break;
        case 'E':
          move(1, 0, Type.DOOR);
          move(1, 0, Type.ROOM);
          break;
        case 'S':
          move(0, 1, Type.DOOR);
          move(0, 1, Type.ROOM);
          break;
        case 'W':
          move(-1, 0, Type.DOOR);
          move(-1, 0, Type.ROOM);
          break;
        case '(':
          stack.push(this.current);
          break;
        case '|':
          this.current = stack[stack.length - 1];
          break;
        case ')':
          this.current = stack.pop();
          break;
        default:
          break;
      }
    }

    const xs = coords.map((coord) => coord.x);
    const ys = coords.map((coord) => coord.y);

    const minX = Math.min(...xs);
    const minY = Math.min(...ys);

    this.width = Math.max(...xs) - minX + 1;
    this.height = Math.max(...ys) - minY + 1;

    // Construct a properly sized grid consisting of walls (initially)
    this.grid = [];
    for (let y = 0; y < this.height; ++y) {
      this.grid[y] = [];
      for (let x = 0; x < this.width; ++x) {
        this.grid[y][x] = new Coord(this, x, y, Type.WALL);
      }
    }

    // Adjust coordinates and add them to the grid
    coords.forEach((coord) => {
      coord.x -= minX;
      coord.y -= minY;
      this.grid[coord.y][coord.x] = coord;
    });
  }

  get rooms() {
    return this.grid.flatMap((row) => (
      row.filter((coord) => coord.type === Type.ROOM)
    ));
  }

  get visual() {
    const overview = this.grid.map((row) => (
      row.map((coord) => coord.visual).join('')
    )).join('\n');
    return overview;
  }
}

export default Facility;
