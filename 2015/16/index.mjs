/* eslint-disable guard-for-in */

import { solution } from '../../utils';

const LINE_MATCHER = /Sue (\d+): (\w+): (\d+), (\w+): (\d+), (\w+): (\d+)/;

const parse = input => input.split('\n').map((line) => {
  const match = line.match(LINE_MATCHER);
  return {
    id: +match[1],
    props: {
      [match[2]]: +match[3],
      [match[4]]: +match[5],
      [match[6]]: +match[7],
    },
  };
});

const initialClues = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1,
};

const revisedClues = {
  ...initialClues,
  cats: { gt: true, value: initialClues.cats },
  trees: { gt: true, value: initialClues.trees },
  pomeranians: { lt: true, value: initialClues.pomeranians },
  goldfish: { lt: true, value: initialClues.goldfish },
};

const isCandidate = (clues, sue) => {
  for (const prop in sue.props) {
    const value = sue.props[prop];
    const clue = clues[prop];
    if (clue.gt) {
      if (value <= clue.value) {
        return false;
      }
    } else if (clue.lt) {
      if (value >= clue.value) {
        return false;
      }
    } else if (clue !== value) {
      return false;
    }
  }
  return true;
};

export const partOne = solution((input) => {
  const sues = parse(input);
  const predicate = isCandidate.bind(null, initialClues);
  return sues.find(predicate).id;
});

export const partTwo = solution((input) => {
  const sues = parse(input);
  const predicate = isCandidate.bind(null, revisedClues);
  return sues.find(predicate).id;
});
