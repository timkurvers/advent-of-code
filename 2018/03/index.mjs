/* eslint-disable no-param-reassign */

import { day } from '..';

import Fabric from './Fabric';
import examples from './input/examples';
import puzzleInput from './input';

day(3).part(1).test(examples).feed(puzzleInput).solution((input) => {
  const fabric = Fabric.from(input);
  return fabric.grid.filter(links => links.length >= 2).length;
});

day(3).part(2).test(examples).feed(puzzleInput).solution((input) => {
  const fabric = Fabric.from(input);
  return fabric.claims.find(claim => !claim.contested).id;
});
