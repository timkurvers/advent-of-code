#!/usr/bin/env node --experimental-modules --no-warnings

import { day } from '..';

import examples from './input/examples';
import puzzleInput from './input';

day(3).part(1).test(examples).feed(puzzleInput).solution(() => null);
day(3).part(2).test(examples).feed(puzzleInput).solution(() => null);
