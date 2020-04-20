import { Orientation, TAU } from '../../utils';

class Asteroid {
  constructor(field, x, y) {
    this.field = field;
    this.x = x;
    this.y = y;
  }

  get label() {
    return `(${this.x},${this.y})`;
  }

  angleTo(other) {
    const dy = this.y - other.y;
    const dx = this.x - other.x;
    // Angle based on UP-orientation for laser requirements
    return ((Math.atan2(dy, dx) + TAU + Orientation.UP) % TAU);
  }

  // TODO: Refactor into navigation utility
  distanceTo(other) {
    return Math.abs(other.x - this.x) + Math.abs(other.y - this.y);
  }

  // Asteroids that can be directly observed
  get observations() {
    const angles = new Map();
    for (const { angle, asteroid, distance } of this.detections) {
      const found = angles.get(angle);
      if (!found || found.distance > distance) {
        angles.set(angle, asteroid);
      }
    }
    return Array.from(angles.values());
  }

  get observationsCount() {
    return this.observations.length;
  }

  // Asteroids that can be detected (may include obscured ones)
  get detections() {
    const list = [];
    for (const asteroid of this.field) {
      if (this === asteroid) {
        continue;
      }
      const angle = this.angleTo(asteroid);
      const distance = this.distanceTo(asteroid);
      list.push({ angle, asteroid, distance });
    }
    return list;
  }
}

export default Asteroid;
