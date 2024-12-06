import { ALL_DIRECTIONS, INTERCARDINAL_DIRECTIONS, Grid, solution } from '../../utils/index.js';

const parse = (input) => Grid.from(input);

const CROSS_PATTERN_DIRECTIONS = INTERCARDINAL_DIRECTIONS;

// Whether given letters are all encountered when walking the grid from starting point in the dx/dy direction
const matches = (letters, { grid, point, dx, dy }) =>
  letters.every((letter, index) => {
    const value = grid.get(point.x + dx * index, point.y + dy * index);
    return value === letter;
  });

const search = (grid, word) => {
  const letters = word.split('');
  let count = 0;
  for (const point of grid) {
    for (const [dx, dy] of ALL_DIRECTIONS) {
      count += +matches(letters, { grid, point, dx, dy });
    }
  }
  return count;
};

const searchCrossPattern = (grid, word) => {
  const letters = word.split('');
  const half = (letters.length / 2) | 0;

  const seen = new Set();
  const hash = (point, dx, dy) => `${point.x}:${point.y}:${dx}:${dy}`;

  let count = 0;
  for (const point of grid) {
    for (const [dx, dy] of CROSS_PATTERN_DIRECTIONS) {
      if (seen.has(hash(point, dx, dy))) {
        continue;
      }

      // Verify initial diagonal pattern
      if (!matches(letters, { grid, point, dx, dy })) {
        continue;
      }

      // In addition to a horizontally flipped one
      let cross = grid.getPoint(point.x + (half + 1) * dx, point.y);
      if (cross && matches(letters, { grid, point: cross, dx: -dx, dy })) {
        seen.add(hash(cross, -dx, dy));
        count += 1;
      }

      // Or a vertically flipped one
      cross = grid.getPoint(point.x, point.y + (half + 1) * dy);
      if (cross && matches(letters, { grid, point: cross, dx, dy: -dy })) {
        seen.add(hash(cross, dx, -dy));
        count += 1;
      }
    }
  }
  return count;
};

export const partOne = solution((input) => {
  const grid = parse(input);
  return search(grid, 'XMAS');
});

export const partTwo = solution((input) => {
  const grid = parse(input);
  return searchCrossPattern(grid, 'MAS');
});
