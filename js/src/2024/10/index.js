/* eslint-disable no-cond-assign */

import { Grid, cast, solution } from '../../utils/index.js';

const parse = (input) => Grid.from(input, { cast });

const explore = (grid) => {
  const zeroes = grid.filter((point) => point.value === 0);

  const frontier = zeroes.map((zero) => ({ current: zero, start: zero }));

  let entry;
  const trails = [];
  while ((entry = frontier.pop())) {
    const { current, start } = entry;

    if (current.value === 9) {
      trails.push({ start, end: current });
      continue;
    }

    for (const candidate of current.adjacentNeighbors) {
      if (current.value + 1 === candidate.value) {
        frontier.push({ current: candidate, start });
      }
    }
  }
  return trails;
};

const normalize = (trails) => {
  const set = new Set();
  for (const { start, end } of trails) {
    set.add(`${start.x}:${start.y} => ${end.x}:${end.y}`);
  }
  return Array.from(set);
};

export const partOne = solution((input) => {
  const grid = parse(input);
  const trails = explore(grid);
  return normalize(trails).length;
});

export const partTwo = solution((input) => {
  const grid = parse(input);
  const trails = explore(grid);
  return trails.length;
});
