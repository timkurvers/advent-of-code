#!/usr/bin/env node --experimental-modules --no-warnings

import input from './input';
import { day } from '../utils';

const OPEN_GROUND = '.';
const TREES = '|';
const LUMBERYARD = '#';

const isOpenGround = tile => tile === OPEN_GROUND;
const isTrees = tile => tile === TREES;
const isLumberyard = tile => tile === LUMBERYARD;

const initial = input.split('\n').map(line => (
  line.split('')
));

const maxX = initial[0].length - 1;
const maxY = initial.length - 1;

const next = grid => (
  grid.map((row, y) => (
    row.map((tile, x) => {
      const neighbors = [
        y > 0 ? grid[y - 1][x - 1] : null,
        y > 0 ? grid[y - 1][x] : null,
        y > 0 ? grid[y - 1][x + 1] : null,
        x > 0 ? grid[y][x - 1] : null,
        x < maxX ? grid[y][x + 1] : null,
        y < maxY ? grid[y + 1][x - 1] : null,
        y < maxY ? grid[y + 1][x] : null,
        y < maxY ? grid[y + 1][x + 1] : null,
      ];

      if (isOpenGround(tile) && neighbors.filter(isTrees).length >= 3) {
        return TREES;
      }
      if (isTrees(tile) && neighbors.filter(isLumberyard).length >= 3) {
        return LUMBERYARD;
      }
      if (isLumberyard(tile) && (
        neighbors.filter(isLumberyard).length < 1
        || neighbors.filter(isTrees).length < 1
      )) {
        return OPEN_GROUND;
      }
      return tile;
    })
  ))
);

const flatten = grid => (
  grid.reduce((flattened, row) => {
    flattened.push(...row);
    return flattened;
  }, [])
);

const generate = (generations, hook = null) => {
  let current = initial;
  for (let i = 0; i < generations; ++i) {
    current = next(current);
    if (hook && hook(i, current) === false) {
      break;
    }
  }
  const final = flatten(current);
  return final.filter(isTrees).length * final.filter(isLumberyard).length;
};

day(18).part(1).solution(() => (
  generate(10)
));

day(18).part(2).solution(() => {
  const cache = {};
  let start;
  let repeat;

  generate(Infinity, (generation, current) => {
    // Cache flattened state of this generation
    const flattened = flatten(current);
    if (!cache[flattened]) {
      cache[flattened] = [];
    }
    cache[flattened].push(generation);

    // Store start offset and frequency on encountering a previous generation
    if (cache[flattened].length > 1) {
      start = generation;
      repeat = cache[flattened][1] - cache[flattened][0];
      return false;
    }
    return true;
  });

  const generations = 1000000000;
  return generate(start + ((generations - start) % repeat));
});
