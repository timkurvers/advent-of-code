#!/usr/bin/env node --experimental-modules --no-warnings

import Program from './Program';
import input from './input';
import { day } from '../utils';

day(19).part(1).solution(() => {
  const program = new Program(input);
  program.run();
  return program.data[0];
});

day(19).part(2).solution(() => (
  // Ain't nobody got time (or computing power) for this
  null
));
