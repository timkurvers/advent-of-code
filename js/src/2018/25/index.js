import { solution } from '../../utils/index.js';

import Point from './Point.js';

export const finalPart = solution((input) => {
  const points = input.trim().split('\n').map((line) => new Point(line));
  for (const point of points) {
    for (const candidate of points) {
      if (point === candidate) continue;
      if (point.distanceTo(candidate) <= 3) {
        const others = [...point.constellation.points];
        for (const other of others) {
          other.constellation = candidate.constellation;
        }
      }
    }
  }

  const constellations = new Set([...points.map((point) => point.constellation)]);
  return constellations.size;
});
