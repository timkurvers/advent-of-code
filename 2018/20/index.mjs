import { solution } from '../../utils';

import Facility from './Facility';

export const partOne = solution((input) => {
  const facility = new Facility(input);
  const furthest = facility.rooms.sort((a, b) => b.distance - a.distance);
  return furthest[0].doors;
});

export const partTwo = solution((input) => {
  const facility = new Facility(input);
  return facility.rooms.filter(room => room.doors >= 1000).length;
});
