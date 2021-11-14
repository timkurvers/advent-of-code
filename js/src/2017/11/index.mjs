import { solution } from '../../utils';

const parse = (input) => input.split(',');

const trek = (path) => {
  // Use cube coordinates
  // See: https://www.redblobgames.com/grids/hexagons/
  let x = 0;
  let y = 0;
  let z = 0;

  let distance = 0;
  let maxDistance = 0;

  for (const direction of path) {
    switch (direction) {
      case 'n':
        y++;
        z--;
        break;
      case 'ne':
        x++;
        z--;
        break;
      case 'nw':
        x--;
        y++;
        break;
      case 's':
        y--;
        z++;
        break;
      case 'se':
        x++;
        y--;
        break;
      case 'sw':
        x--;
        z++;
        break;
      default:
    }
    distance = (Math.abs(x) + Math.abs(y) + Math.abs(z)) / 2;
    if (distance > maxDistance) {
      maxDistance = distance;
    }
  }

  return { distance, maxDistance };
};

export const partOne = solution((input) => {
  const path = parse(input);
  return trek(path).distance;
});

export const partTwo = solution((input) => {
  const path = parse(input);
  return trek(path).maxDistance;
});
