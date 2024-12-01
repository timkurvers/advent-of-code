class Location {
  constructor(x, y, coords) {
    this.x = x;
    this.y = y;
    this.coords = coords;
  }

  get closestCoord() {
    let winners = [];
    let min = Infinity;

    this.coords.forEach((coord) => {
      const distance = coord.distanceTo(this.x, this.y);
      if (distance < min) {
        winners = [coord];
        min = distance;
      } else if (distance === min) {
        winners.push(coord);
      }
    });

    return winners.length === 1 ? winners[0] : null;
  }

  get totalDistanceToAllCoords() {
    return this.coords.reduce((sum, coord) => sum + coord.distanceTo(this.x, this.y), 0);
  }
}

export default Location;
