#!/usr/bin/env node --experimental-modules --no-warnings

import { day } from '..';

import Event from './Event';
import Guard from './Guard';
import Shift from './Shift';
import input from './input';

const events = input.map(definition => new Event(definition)).sort((a, b) => (
  a.definition.localeCompare(b.definition)
));

const guards = (() => {
  let guard = null;
  let shift = null;

  const set = new Set();
  events.forEach((event) => {
    if (!guard || (event.guardID && event.guardID !== guard.id)) {
      guard = Guard.for(event.guardID);
      set.add(guard);
    }

    if (event.action === 'begins shift') {
      shift = new Shift();
      guard.shifts.push(shift);
    }

    shift.events.push(event);
  });
  return Array.from(set);
})();

day(4).part(1).solution(() => {
  const sleepy = guards.sort((a, b) => (
    b.totalMinutesAsleep - a.totalMinutesAsleep
  ))[0];

  return sleepy.id * sleepy.mostAsleepPerMinute.minute;
});

day(4).part(2).solution(() => {
  const sleepyPerMinute = guards.sort((a, b) => (
    b.mostAsleepPerMinute.frequency - a.mostAsleepPerMinute.frequency
  ))[0];

  return sleepyPerMinute.id * sleepyPerMinute.mostAsleepPerMinute.minute;
});
