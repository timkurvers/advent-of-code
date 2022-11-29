import { solution } from '../../utils';

import Grid from './Grid';

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
