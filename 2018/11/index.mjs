import { day } from '..';

import Grid from './Grid';
import examples from './input/examples';
import puzzleInput from './input';

day(11).part(1).test(examples).feed(puzzleInput).solution((serialNumber) => {
  const grid = new Grid(serialNumber);
  const square = grid.findMostPowerfulSquareBySize(3);
  return square.point.toString();
});

day(11).part(2).test(examples).feed(puzzleInput).solution((serialNumber) => {
  const grid = new Grid(serialNumber);
  const square = grid.findMostPowerfulSquare();
  return square.point.concat(square.size).toString();
});
