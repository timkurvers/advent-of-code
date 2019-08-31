#!/usr/bin/env node --experimental-modules --no-warnings

import { CircularLinkedList } from '../../utils';
import { day } from '..';

import examples from './input/examples';
import puzzleInput from './input';
import {
  createRange,
  hexknothash,
  parse,
  twist,
} from './knothash';

day(10).part(1).test(examples).feed(puzzleInput).solution((input, isExample) => {
  const lengths = parse(input);
  const root = CircularLinkedList.from(...createRange(isExample ? 5 : undefined));
  twist(root, lengths);
  return root.value * root.next.value;
});

day(10).part(2).test(examples).feed(puzzleInput).solution(input => (
  hexknothash(input)
));
