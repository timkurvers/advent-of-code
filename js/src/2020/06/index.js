/* eslint-disable no-param-reassign */

import { solution, sum } from '../../utils/index.js';

const parse = (input) =>
  input
    .trim()
    .split('\n\n')
    .map((raw) => {
      const participants = raw.split('\n').map((line) => line.split(''));
      const tally = participants.reduce((accu, answers) => {
        for (const answer of answers) {
          accu[answer] = (accu[answer] || 0) + 1;
        }
        return accu;
      }, {});
      return { raw, participants, tally };
    });

export const partOne = solution((input) => {
  const groups = parse(input);
  return sum(groups.map((group) => Object.values(group.tally).length));
});

export const partTwo = solution((input) => {
  const groups = parse(input);
  return sum(
    groups.map((group) => {
      const { length } = group.participants;
      return Object.values(group.tally).filter((count) => count === length).length;
    }),
  );
});
