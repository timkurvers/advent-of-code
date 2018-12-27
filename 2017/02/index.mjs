#!/usr/bin/env node --experimental-modules --no-warnings

import { day } from '..';
import { sum } from '../../utils';

import input from './input';

day(2).part(1).solution(() => {
  const diffs = input.split('\n').map((line) => {
    const row = line.split('\t').map(Number);
    return Math.max(...row) - Math.min(...row);
  });
  return sum(diffs);
});

day(2).part(2).solution(() => {
  const divisions = input.split('\n').map((line) => {
    const row = line.split('\t').map(Number);
    for (let i = 0; i < row.length; ++i) {
      for (let j = 0; j < row.length; ++j) {
        if (i === j) continue;
        const division = row[i] / row[j];
        if (Number.isInteger(division)) {
          return division;
        }
      }
    }
    return 0;
  });
  return sum(divisions);
});
