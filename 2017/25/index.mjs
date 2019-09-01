#!/usr/bin/env node --experimental-modules --no-warnings

import { day } from '..';

import TuringMachine from './TuringMachine';
import examples from './input/examples';
import puzzleInput from './input';

day(25).part(1).test(examples).feed(puzzleInput).solution((input) => {
  const machine = TuringMachine.from(input);
  machine.run();
  return machine.checksum;
});
