import { bfs, solution } from '../../utils/index.js';

const serialize = (cube) => cube.join(',');

const parse = (input) => {
  const cubes = new Map();
  const min = [Infinity, Infinity, Infinity];
  const max = [-Infinity, -Infinity, -Infinity];

  for (const line of input.trim().split('\n')) {
    const cube = line.split(',').map(Number);
    for (const dim of cube.keys()) {
      if (cube[dim] < min[dim]) min[dim] = cube[dim];
      if (cube[dim] > max[dim]) max[dim] = cube[dim];
    }
    cubes.set(line, cube);
  }

  return { cubes, min, max };
};

const sides = [
  [-1, 0, 0],
  [1, 0, 0],
  [0, -1, 0],
  [0, 1, 0],
  [0, 0, -1],
  [0, 0, 1],
];

export const partOne = solution((input) => {
  const { cubes } = parse(input);

  let surface = 0;
  for (const cube of cubes.values()) {
    for (const side of sides) {
      const target = [cube[0] + side[0], cube[1] + side[1], cube[2] + side[2]];
      if (!cubes.has(serialize(target))) {
        ++surface;
      }
    }
  }

  return surface;
});

export const partTwo = solution((input) => {
  const { cubes, min, max } = parse(input);

  const space = new Map([[serialize(min), min]]);

  const isOutOfBounds = (target) =>
    target[0] < min[0] - 1 ||
    target[0] > max[0] + 1 ||
    target[1] < min[1] - 1 ||
    target[1] > max[1] + 1 ||
    target[2] < min[2] - 1 ||
    target[2] > max[2] + 1;

  let surface = 0;
  bfs(min, null, {
    nodesFor: (current) => {
      const nodes = [];
      for (const side of sides) {
        const target = [current[0] + side[0], current[1] + side[1], current[2] + side[2]];

        if (isOutOfBounds(target)) {
          continue;
        }

        const hash = serialize(target);
        if (cubes.has(hash)) {
          ++surface;
        } else if (!space.has(hash)) {
          space.set(hash, target);
          nodes.push(target);
        }
      }
      return nodes;
    },
  });

  return surface;
});
