#!/usr/bin/env node --experimental-modules --no-warnings

/* eslint-disable no-cond-assign, no-loop-func */

import { day } from '..';

import Step from './Step';
import Worker from './Worker';
import examples from './input/examples';
import puzzleInput from './input';

const solve = (steps, { instantCompletion, workerCount = 1, fixedDuration = 0 }) => {
  const workers = Array.from(new Array(workerCount).keys(), nr => (
    new Worker(nr)
  ));

  // Alphabetical sort order is maintained when filtering steps below
  let remaining = steps.sort((a, b) => a.id.localeCompare(b.id));
  const order = [];

  let seconds = 0;
  while (true) {
    // Remaining steps (not yet completed)
    remaining = steps.filter(step => !step.completed);

    // Complete and filter out steps that have run their duration
    remaining = remaining.filter((step) => {
      if (!step.started) return true;

      const since = seconds - step.startedAt;
      if (instantCompletion || since >= step.duration + fixedDuration) {
        step.complete();
        order.push(step);
        return false;
      }
      return true;
    });

    // When all steps have been completed, bail out early
    if (!remaining.length) {
      break;
    }

    let worker;
    while (worker = workers.find(w => w.idle)) {
      const index = remaining.findIndex(step => step.eligible);
      const step = remaining[index];

      // No eligible steps at the moment, try next iteration
      if (!step) {
        break;
      }

      step.start(seconds, worker);
    }

    ++seconds;
  }

  return {
    seconds,
    order,
  };
};

day(7).part(1).test(examples).feed(puzzleInput).solution((input) => {
  const steps = Step.from(input);
  return solve(steps, {
    instantCompletion: true,
  }).order.map(step => step.id).join('');
});

day(7).part(2).test(examples).feed(puzzleInput).solution((input, isExample) => {
  const steps = Step.from(input);
  return solve(steps, {
    instantCompletion: false,
    workerCount: isExample ? 2 : 5,
    fixedDuration: isExample ? 0 : 60,
  }).seconds;
});
