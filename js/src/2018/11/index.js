import { solution } from '../../utils/index.js';

import Grid from './Grid.js';

export const partOne = solution((serialNumber) => {
  const grid = new Grid(serialNumber);
  const square = grid.findMostPowerfulSquareBySize(3);
  return square.point.toString();
});

export const partTwo = solution((serialNumber) => {
  const grid = new Grid(serialNumber);
  const square = grid.findMostPowerfulSquare();
  return square.point.concat(square.size).toString();
});
