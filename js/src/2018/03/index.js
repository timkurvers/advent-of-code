import { solution } from '../../utils/index.js';

import Fabric from './Fabric.js';

export const partOne = solution((input) => {
  const fabric = Fabric.from(input);
  return fabric.grid.filter((links) => links.length >= 2).length;
});

export const partTwo = solution((input) => {
  const fabric = Fabric.from(input);
  return fabric.claims.find((claim) => !claim.contested).id;
});
