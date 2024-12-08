import { Grid, combine, solution } from '../../utils/index.js';

const BLANK = '.';

const parse = (input) => Grid.from(input);

const scan = (grid, { withResonance = false } = {}) => {
  const { minX, maxX, minY, maxY } = grid;

  const frequencies = Object.groupBy(
    grid.filter((point) => point.value !== BLANK),
    (point) => point.value,
  );

  const antinodes = new Set();

  for (const points of Object.values(frequencies)) {
    for (const [a, b] of combine(points, { k: 2 })) {
      const dx = a.x - b.x;
      const dy = a.y - b.y;

      let { x: ax, y: ay } = a;
      let { x: bx, y: by } = b;
      do {
        const first = grid.getPoint((ax += dx), (ay += dy));
        if (first) {
          antinodes.add(first);
        }

        const second = grid.getPoint((bx -= dx), (by -= dy));
        if (second) {
          antinodes.add(second);
        }
      } while (
        withResonance &&
        ((ax >= minX && ax <= maxX && ay >= minY && ay <= maxY) ||
          (bx >= minX && bx <= maxX && by >= minY && by <= maxY))
      );

      if (withResonance) {
        antinodes.add(a);
        antinodes.add(b);
      }
    }
  }

  return { antinodes };
};

export const partOne = solution((input) => {
  const grid = parse(input);
  return scan(grid).antinodes.size;
});

export const partTwo = solution((input) => {
  const grid = parse(input);
  return scan(grid, { withResonance: true }).antinodes.size;
});
