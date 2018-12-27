#!/usr/bin/env node --experimental-modules --no-warnings

import { day } from '..';

import Star from './Star';
import input from './input';

const stars = input.map(definition => new Star(definition));

const snapshot = (t) => {
  const points = stars.map(star => star.at(t));

  const xs = points.map(point => point.x);
  const ys = points.map(point => point.y);

  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const size = (maxX - minX) * (maxY - minY);

  return {
    points, xs, ys, minX, maxX, minY, maxY, size,
  };
};

let t = 0;
let smallest = Infinity;
do {
  const { size } = snapshot(t);
  if (size < smallest) {
    smallest = size;
  } else if (size > smallest) {
    --t;
    break;
  }
  ++t;
} while (true);

const {
  minY, maxY, minX, maxX, points,
} = snapshot(t);

day(10).part(1).solution(() => {
  let output = '\n';
  for (let y = minY; y <= maxY; ++y) {
    for (let x = minX; x <= maxX; ++x) {
      const present = points.find(point => point.x === x && point.y === y);
      output += present ? '#' : '.';
    }
    output += '\n';
  }
  console.log(output);

  return '<see visually above>';
});

day(10).part(2).solution(() => t);
