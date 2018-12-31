#!/usr/bin/env node --experimental-modules --no-warnings

/* eslint-disable prefer-destructuring */

import Program, { Interceptor } from '../19/Program';
import { day } from '..';

import input from './input';

day(21).part(1).solution(() => {
  const program = new Program(input);

  // Intercept instruction #28, retrieve the answer from register 4 and halt
  // the program by returning false from the intercept hook.
  let answer;
  program.intercept(28, (data) => {
    answer = data[4];
    return Interceptor.HALT;
  });

  program.run();

  return answer;
});

day(21).part(2).inefficient.solution(() => {
  const program = new Program(input);

  // Intercept instruction #28, retrieve candidate answer from register 4 and
  // store alongside execution count.
  const candidates = new Map();
  program.intercept(28, (data) => {
    const candidate = data[4];
    if (candidates.has(candidate)) {
      return Interceptor.HALT;
    }
    candidates.set(candidate, program.executions);
    return Interceptor.CONTINUE;
  });

  program.run();

  const descending = [...candidates.entries()].sort((a, b) => b[1] - a[1]);
  const [answer] = descending[0];
  return answer;
});
