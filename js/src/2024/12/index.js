/* eslint-disable no-cond-assign */

import { Grid, solution } from '../../utils/index.js';

const parse = (input) => Grid.from(input);

const survey = (garden) => {
  const start = garden.getPoint(0, 0);

  const regions = [];

  // Holds a queue of points currently processing (frontier) and still to process in other regions (next)
  const frontier = [start];
  const next = [];

  // Tracking for individual points
  const seen = new Set();
  const regionsByPoint = new Map();

  let current;
  while (frontier.length) {
    while ((current = frontier.pop())) {
      if (seen.has(current)) {
        continue;
      }
      seen.add(current);

      const { up, down, left, right } = current;

      let region;
      if (regionsByPoint.has(current)) {
        region = regionsByPoint.get(current);
      } else {
        region = { id: current.value, area: 0, perimeter: 0, sides: 0 };
        regions.push(region);
        regionsByPoint.set(current, region);
      }

      ++region.area;

      // Track outer and inner perimeters
      const outer = { up: false, down: false, left: false, right: false };
      const inner = { up: false, down: false, left: false, right: false };

      for (const [side, candidate] of Object.entries({ up, down, left, right })) {
        // Out of bounds
        if (!candidate) {
          outer[side] = true;
          ++region.perimeter;
          continue;
        }

        // Part of the same region
        if (candidate.value === current.value) {
          inner[side] = true;
          regionsByPoint.set(candidate, region);
          frontier.push(candidate);
          continue;
        }

        // Part of another region (schedule as next frontier when done)
        outer[side] = true;
        ++region.perimeter;
        next.push(candidate);
      }

      // Track corners to determine sides (the corners are fence posts = amount of fence sides)
      // See: https://en.wikipedia.org/wiki/Rectilinear_polygon
      let sides = 0;

      if (outer.up && outer.left) {
        sides += 1;
      }
      if (outer.up && outer.right) {
        sides += 1;
      }
      if (outer.down && outer.left) {
        sides += 1;
      }
      if (outer.down && outer.right) {
        sides += 1;
      }

      if (inner.up && inner.left && up.left?.value !== current.value) {
        sides += 1;
      }
      if (inner.up && inner.right && up.right?.value !== current.value) {
        sides += 1;
      }
      if (inner.down && inner.left && down.left?.value !== current.value) {
        sides += 1;
      }
      if (inner.down && inner.right && down.right?.value !== current.value) {
        sides += 1;
      }

      region.sides += sides;
    }

    // Fully done with this region, move to the next (if any)
    if (!frontier.length) {
      frontier.push(...next);
      next.length = 0;
    }
  }

  return regions;
};

export const partOne = solution((input) => {
  const garden = parse(input);
  const regions = survey(garden);
  return regions.reduce((sum, region) => sum + region.area * region.perimeter, 0);
});

export const partTwo = solution((input) => {
  const garden = parse(input);
  const regions = survey(garden);
  return regions.reduce((sum, region) => sum + region.area * region.sides, 0);
});
