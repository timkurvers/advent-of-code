import { combine, solution } from '../../utils/index.js';

const parse = (input) =>
  input
    .trim()
    .split('\n')
    .map((line) => {
      const [x, y] = line.split(',').map(Number);
      return { x, y };
    });

export const partOne = solution((input) => {
  const tiles = parse(input);

  const pairs = combine(tiles, { k: 2 });

  let max = -Infinity;
  for (const [a, b] of pairs) {
    const area = (Math.abs(a.x - b.x) + 1) * (Math.abs(a.y - b.y) + 1);
    if (area > max) {
      max = area;
    }
  }
  return max;
});

// Haven't had time yet for p2 :(
