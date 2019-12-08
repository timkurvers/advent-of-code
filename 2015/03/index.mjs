/* eslint-disable quote-props */

import {
  Grid,
  Orientation,
  dx,
  dy,
  solution,
} from '../../utils';

const directions = {
  '^': Orientation.UP,
  'v': Orientation.DOWN,
  '>': Orientation.RIGHT,
  '<': Orientation.LEFT,
};

const deliver = (input, { santas = 1 } = {}) => {
  const grid = new Grid();

  const positions = Array.from({ length: santas }, () => ({
    x: 0,
    y: 0,
    orientation: null,
  }));

  grid.set(0, 0, santas);
  for (let i = 0; i < input.length; ++i) {
    const santa = positions[i % santas];
    const char = input[i];
    santa.orientation = directions[char];
    santa.x += dx(santa.orientation);
    santa.y += dy(santa.orientation);
    grid.set(santa.x, santa.y, (grid.get(santa.x, santa.y) || 0) + 1);
  }

  const visited = grid.filter(point => point && point.value);
  return { grid, visited };
};

export const partOne = solution(input => (
  deliver(input).visited.length
));

export const partTwo = solution(input => (
  deliver(input, { santas: 2 }).visited.length
));
