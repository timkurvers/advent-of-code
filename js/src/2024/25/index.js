import { Grid, solution } from '../../utils/index.js';

const FILLED = '#';

const parse = (input) => {
  const keys = [];
  const locks = [];
  for (const schematic of input.trim().split('\n\n')) {
    const grid = Grid.from(schematic);
    const isLock = grid.get(0, 0) === FILLED;

    const heights = [];
    for (let x = grid.minX; x <= grid.maxX; ++x) {
      let height = 0;
      for (let y = isLock ? 1 : 5; isLock ? y < 6 : y > 0; y += isLock ? 1 : -1) {
        if (grid.get(x, y) === FILLED) {
          ++height;
        }
      }
      heights.push(height);
    }

    if (isLock) {
      locks.push(heights);
    } else {
      keys.push(heights);
    }
  }
  return { keys, locks };
};

const fits = (key, lock) => lock.every((height, index) => height + key[index] < 6);

export const finalPart = solution((input) => {
  const { keys, locks } = parse(input);

  let count = 0;
  for (const lock of locks) {
    for (const key of keys) {
      if (fits(key, lock)) {
        ++count;
      }
    }
  }
  return count;
});
