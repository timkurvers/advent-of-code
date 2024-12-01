import { CircularLinkedList, reduceMaxBy, solution } from '../../utils/index.js';

import Asteroid from './Asteroid.js';

const parse = (input) => {
  const field = [];
  for (const [y, line] of input.split('\n').entries()) {
    const matches = Array.from(line.matchAll(/#/g));
    for (const { index: x } of matches) {
      field.push(new Asteroid(field, x, y));
    }
  }
  return field;
};

export const partOne = solution((input) => {
  const asteroids = parse(input);
  const best = reduceMaxBy(asteroids, 'observationsCount');
  return best.observationsCount;
});

export const partTwo = solution((input) => {
  const asteroids = parse(input);
  const station = reduceMaxBy(asteroids, 'observationsCount');

  // Sort all targets by angle ascending and – if equal – by distance ascending
  const targets = station.detections.sort((a, b) => {
    const diff = a.angle - b.angle;
    if (diff === 0) {
      return a.distance - b.distance;
    }
    return diff;
  });

  const removed = [];

  let current = CircularLinkedList.from(targets);
  while (current) {
    const { value: detection } = current;
    const { asteroid, angle } = detection;

    // Mark current asteroid for zapping and find the next one making sure to
    // prioritize non-obstructed asteroids
    const zap = current;
    do {
      current = current.next;
    } while (current.value.angle === angle && current !== zap);

    // Remove the asteroid marked for zapping
    zap.remove();
    removed.push(asteroid);

    // Final asteroid has been zapped!
    if (current === zap) {
      break;
    }
  }

  return removed[199].x * 100 + removed[199].y;
});
