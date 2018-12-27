class Entity {
  constructor(map, coord = null) {
    this.map = map;
    this.coord = coord;
  }

  get coord() {
    return this._coord;
  }

  set coord(coord) {
    if (this._coord) {
      this._coord.entity = null;
    }
    this._coord = coord;
    if (this._coord) {
      this._coord.entity = this;
    }
  }
}

export default Entity;
