import { solution } from '../../utils';

import Fabric from './Fabric';

export const partOne = solution((input) => {
  const fabric = Fabric.from(input);
  return fabric.grid.filter(links => links.length >= 2).length;
});

export const partTwo = solution((input) => {
  const fabric = Fabric.from(input);
  return fabric.claims.find(claim => !claim.contested).id;
});
