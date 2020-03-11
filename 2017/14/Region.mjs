class Region {
  constructor(grid, id) {
    this.id = id;

    Object.defineProperty(this, 'grid', {
      enumerable: false,
      value: grid,
    });
  }

  get points() {
    return this.grid.filter((point) => point.region === this);
  }
}

export default Region;
