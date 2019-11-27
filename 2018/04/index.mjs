import { day } from '..';

import Event from './Event';
import Guard from './Guard';
import Shift from './Shift';
import examples from './input/examples';
import puzzleInput from './input';

const schedule = (input) => {
  const events = input.split('\n').sort().map(definition => (
    new Event(definition)
  ));

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

day(4).part(1).test(examples).feed(puzzleInput).solution((input) => {
  const guards = schedule(input);

  const sleepy = guards.sort((a, b) => (
    b.totalMinutesAsleep - a.totalMinutesAsleep
  ))[0];

  return sleepy.id * sleepy.mostAsleepPerMinute.minute;
});

day(4).part(2).test(examples).feed(puzzleInput).solution((input) => {
  const guards = schedule(input);

  const sleepyPerMinute = guards.sort((a, b) => (
    b.mostAsleepPerMinute.frequency - a.mostAsleepPerMinute.frequency
  ))[0];

  return sleepyPerMinute.id * sleepyPerMinute.mostAsleepPerMinute.minute;
});
