import { solution } from '../../utils/index.js';

import Event from './Event.js';
import Guard from './Guard.js';
import Shift from './Shift.js';

const schedule = (input) => {
  const events = input
    .trim()
    .split('\n')
    .sort()
    .map((definition) => new Event(definition));

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
};

export const partOne = solution((input) => {
  const guards = schedule(input);

  const sleepy = guards.sort((a, b) => b.totalMinutesAsleep - a.totalMinutesAsleep)[0];

  return sleepy.id * sleepy.mostAsleepPerMinute.minute;
});

export const partTwo = solution((input) => {
  const guards = schedule(input);

  const sleepyPerMinute = guards.sort(
    (a, b) => b.mostAsleepPerMinute.frequency - a.mostAsleepPerMinute.frequency,
  )[0];

  return sleepyPerMinute.id * sleepyPerMinute.mostAsleepPerMinute.minute;
});
