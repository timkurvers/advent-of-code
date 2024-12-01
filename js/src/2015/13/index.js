import {
  permute,
  solution,
  sum,
  wrap,
} from '../../utils/index.js';

import Person from './Person.js';

const REACTION_MATCHER = /(\w+) .+ (gain|lose) (\d+) .+ to (\w+)/g;

const parse = (input) => {
  const people = [];

  const lookup = (name) => {
    let person = people.find((p) => p.name === name);
    if (!person) {
      person = new Person(name);
      people.push(person);
    }
    return person;
  };

  for (const match of input.matchAll(REACTION_MATCHER)) {
    const [, a, effect, amount, b] = match;

    const person = lookup(a);
    const other = lookup(b);
    const change = effect === 'gain' ? +amount : -amount;
    person.reactions.push({ person: other, change });
  }

  return people;
};

const rate = (arrangement) => {
  const { length } = arrangement;
  return sum(arrangement.map((person, index) => {
    const left = arrangement[wrap(index - 1, length)];
    const right = arrangement[wrap(index + 1, length)];
    return person.happinessWith(left, right);
  }));
};

const seat = (people) => {
  let best = {
    arrangement: null,
    rating: -Infinity,
  };
  for (const arrangement of permute(people)) {
    const rating = rate(arrangement);
    if (rating > best.rating) {
      best = { arrangement, rating };
    }
  }
  return best;
};

export const partOne = solution((input) => {
  const people = parse(input);
  return seat(people).rating;
});

export const partTwo = solution((input) => {
  const people = parse(input);
  people.push(new Person('Tim'));
  return seat(people).rating;
});
