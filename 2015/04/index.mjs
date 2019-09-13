#!/usr/bin/env node --experimental-modules --no-warnings

import { day } from '..';
import { hexmd5 } from '../../utils';

import examples from './input/examples';
import puzzleInput from './input';

const mine = (secret, { startPattern } = {}) => {
  let index = 1;
  while (true) {
    const hash = hexmd5(`${secret}${index}`);
    if (hash.startsWith(startPattern)) {
      return index;
    }
    ++index;
  }
};

day(4).part(1).inefficient.test(examples).feed(puzzleInput).solution(input => (
  mine(input, { startPattern: '00000' })
));

day(4).part(2).inefficient.test(examples).feed(puzzleInput).solution(input => (
  mine(input, { startPattern: '000000' })
));
