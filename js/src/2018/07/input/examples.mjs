import { example } from '../../../utils';

export const partOne = [
  example(`Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.`, 'CABDFE'),
];

export const partTwo = [
  example(partOne[0].input, 15, { workerCount: 2, fixedDuration: 0 }),
];
