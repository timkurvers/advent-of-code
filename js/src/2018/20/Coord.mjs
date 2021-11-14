const Type = {
  WALL: 0,
  ROOM: 1,
  DOOR: 2,
};

class Coord {
  constructor(facility, x, y, type = Type.ROOM) {
    this.facility = facility;
    this.x = x;
    this.y = y;
    this.type = type;
    this.distance = 0;
  }

  get isPathable() {
    return this.type !== Type.WALL;
  }

  get label() {
    return `(${this.x},${this.y})`;
  }

  get doors() {
    return this.distance / 2;
  }

  get visual() {
    const { type } = this;
    if (this.facility.start === this) return 'X';
    if (type === Type.WALL) return '#';
    if (type === Type.ROOM) return '.';
    if (type === Type.DOOR) return '|';
    return '?';
  }
}

export default Coord;
export { Type };
