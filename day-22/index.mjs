#!/usr/bin/env node --experimental-modules --no-warnings

import Cave from './Cave';
import input from './input';
import { day, sum } from '../utils';

const cave = new Cave(input);

day(22).part(1).solution(() => (
  sum(cave.regions.map(region => region.riskLevel))
));

day(22).part(2).solution(() => null);
