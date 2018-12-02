#!/usr/bin/env node --experimental-modules --no-warnings

import input from './input';
import { day } from '../utils';

day(1).part(1).solution(() => (
  input.reduce((sum, next) => sum + next, 0)
));

day(1).part(2).solution(() => {
  const findDuplicateFrequency = () => {
    const frequencies = new Set();
    let frequency = 0;

    while (true) {
      for (const entry of input) {
        frequency += entry;
        if (frequencies.has(frequency)) {
          return frequency;
        }
        frequencies.add(frequency);
      }
    }
  };

  return findDuplicateFrequency();
});
