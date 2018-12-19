class Pathing {
  constructor() {
    this.reset();
  }

  reset() {
    // For each node, which node it can most efficiently be reached from.
    // If a node can be reached from many nodes, cameFrom will eventually contain the
    // most efficient previous step.
    this.cameFrom = null;

    // For each node, the cost of getting from the start node to that node.
    this.score = Infinity;
  }
}

class Coord {
  constructor(map, x, y) {
    this.map = map;
    this.x = x;
    this.y = y;
    this.entity = null;
    this.pathing = new Pathing();
  }

  get label() {
    return `(${this.y},${this.x})`;
  }

  get neighbors() {
    const { width, height } = this.map;
    return [
      this.y > 0 ? this.map.grid[this.y - 1][this.x] : null,
      this.x > 0 ? this.map.grid[this.y][this.x - 1] : null,
      this.x < width - 1 ? this.map.grid[this.y][this.x + 1] : null,
      this.y < height - 1 ? this.map.grid[this.y + 1][this.x] : null,
    ].filter(Boolean);
  }

  get unoccupiedNeighbors() {
    return this.neighbors.filter(coord => !coord.entity);
  }

  // See: https://en.wikipedia.org/wiki/A*_search_algorithm#Pseudocode
  pathTo(goal) {
    const start = this;

    // Reset pathing state
    this.map.grid.forEach(row => row.forEach(coord => coord.pathing.reset()));

    // The set of nodes already evaluated
    const closedSet = new Set();

    // The set of currently discovered nodes that are not evaluated yet.
    // Initially, only the start node is known.
    const openSet = new Set([start]);

    // The cost of going from start to start is zero.
    start.pathing.score = 0;

    while (openSet.size) {
      const current = Array.from(openSet).reduce((found, next) => (
        next.score < found.score ? next : found
      ));

      if (current === goal) {
        const path = [];
        let step = goal;
        do {
          path.push(step);
          step = step.pathing.cameFrom;
        } while (step);
        return path.reverse();
      }

      openSet.delete(current);
      closedSet.add(current);

      for (const neighbor of current.unoccupiedNeighbors) {
        if (closedSet.has(neighbor)) {
          continue;
        }

        // The distance from start to a neighbor
        const scoreTentative = current.pathing.score + current.distanceTo(neighbor);

        // Discover a new node
        if (!openSet.has(neighbor)) {
          openSet.add(neighbor);
        } else if (scoreTentative >= neighbor.pathing.score) {
          continue;
        }

        // Best path until now
        neighbor.pathing.cameFrom = current;
        neighbor.pathing.score = scoreTentative;
      }
    }

    return null;
  }

  distanceTo(other) {
    return Math.abs(other.x - this.x) + Math.abs(other.y - this.y);
  }
}

export default Coord;
