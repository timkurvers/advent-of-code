import { solution } from '../../utils';

import Star from './Star';

const snapshot = (stars, t) => {
  const points = stars.map(star => star.at(t));

  const xs = points.map(point => point.x);
  const ys = points.map(point => point.y);

  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const size = (maxX - minX) * (maxY - minY);

  return {
    points, xs, ys, minX, maxX, minY, maxY, size, t,
  };
};

const find = (input) => {
  const stars = input.split('\n').map(definition => new Star(definition));

  let t = 0;
  let smallest = Infinity;
  do {
    const { size } = snapshot(stars, t);
    if (size < smallest) {
      smallest = size;
    } else if (size > smallest) {
      --t;
      break;
    }
    ++t;
  } while (true);

  return snapshot(stars, t);
};

export const partOne = solution((input) => {
  const {
    minY, maxY, minX, maxX, points,
  } = find(input);

  let output = '\n';
  for (let y = minY; y <= maxY; ++y) {
    for (let x = minX; x <= maxX; ++x) {
      const present = points.find(point => point.x === x && point.y === y);
      output += present ? '#' : ' ';
    }
    output += '\n';
  }
  console.log(output);

  return '<see visually above>';
});

export const partTwo = solution((input) => {
  const { t } = find(input);
  return t;
});
