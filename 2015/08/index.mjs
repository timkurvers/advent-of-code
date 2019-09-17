#!/usr/bin/env node --experimental-modules --no-warnings

/* eslint-disable no-eval */

import { day } from '..';
import { sum } from '../../utils';

import examples from './input/examples';
import puzzleInput from './input';

const parse = input => input.split('\n').map((code) => {
  return {
    code,
    string: eval(code),
  };
});

const encode = str => JSON.stringify(str);

day(8).part(1).test(examples).feed(puzzleInput).solution((input) => {
  const lines = parse(input);
  const code = sum(lines.map(line => line.code.length));
  const string = sum(lines.map(line => line.string.length));
  return code - string;
});

day(8).part(2).test(examples).feed(puzzleInput).solution((input) => {
  const lines = parse(input);
  const code = sum(lines.map(line => line.code.length));
  const encoded = sum(lines.map(line => encode(line.code).length));
  return encoded - code;
});
