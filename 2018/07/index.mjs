#!/usr/bin/env node --experimental-modules --no-warnings

/* eslint-disable no-cond-assign, no-loop-func */

import { day } from '..';

import Step from './Step';
import Worker from './Worker';
import input from './input';

const INSTRUCTION_MATCHER = /Step (\w) .+ step (\w)/i;

input.forEach((instruction) => {
  const [, prequisite, step] = instruction.match(INSTRUCTION_MATCHER);
  Step.for(step).prerequisites.push(Step.for(prequisite));
});

const solve = ({ instantCompletion, workerCount = 1, fixedDuration = 0 }) => {
  const workers = Array.from(new Array(workerCount).keys(), nr => (
    new Worker(nr)
  ));

  // Alphabetical sort order is maintained when filtering steps below
  const steps = Step.all.sort((a, b) => a.id.localeCompare(b.id));
  const order = [];

  let seconds = 0;
  while (true) {
    // Remaining steps (not yet completed)
    let remaining = steps.filter(step => !step.completed);

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

day(7).part(1).solution(() => (
  solve({
    instantCompletion: true,
  }).order.map(step => step.id).join('')
));

Step.reset();

day(7).part(2).solution(() => (
  solve({
    instantCompletion: false,
    workerCount: input.example ? 2 : 5,
    fixedDuration: input.example ? 0 : 60,
  }).seconds
));
