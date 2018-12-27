#!/usr/bin/env node --experimental-modules --no-warnings

import { day } from '..';

import Grid from './Grid';
import input from './input';

day(11).part(1).solution(() => (
  input.map((serialNumber) => {
    const grid = new Grid(serialNumber);
    const square = grid.findMostPowerfulSquareBySize(3);
    return square.point;
  }).join(' ')
));

day(11).part(2).solution(() => (
  input.map((serialNumber) => {
    const grid = new Grid(serialNumber);
    const square = grid.findMostPowerfulSquare();
    return square.point.concat(square.size);
  }).join(' ')
));
