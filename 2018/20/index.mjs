import { day } from '..';

import Facility from './Facility';
import examples from './input/examples';
import puzzleInput from './input';

day(20).part(1).test(examples).feed(puzzleInput).solution((input) => {
  const facility = new Facility(input);
  const furthest = facility.rooms.sort((a, b) => b.distance - a.distance);
  return furthest[0].doors;
});

day(20).part(2).test(examples).feed(puzzleInput).solution((input) => {
  const facility = new Facility(input);
  return facility.rooms.filter(room => room.doors >= 1000).length;
});
