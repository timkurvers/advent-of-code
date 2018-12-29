#!/usr/bin/env node --experimental-modules --no-warnings

import { day } from '..';

import Facility from './Facility';
import input from './input';

const facility = new Facility(input);

day(20).part(1).solution(() => {
  const furthest = facility.rooms.sort((a, b) => b.distance - a.distance);
  return furthest[0].doors;
});

day(20).part(2).solution(() => (
  facility.rooms.filter(room => room.doors >= 1000).length
));
