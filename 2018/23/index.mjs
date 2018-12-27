#!/usr/bin/env node --experimental-modules --no-warnings

import { day } from '..';

import Nanobot from './Nanobot';
import input from './input';

const nanobots = input.split('\n').map(definition => new Nanobot(definition));

day(23).part(1).solution(() => {
  const strongest = nanobots.reduce((nanobot, next) => (
    nanobot.radius > next.radius ? nanobot : next
  ));
  return strongest.inRange(nanobots).length;
});
