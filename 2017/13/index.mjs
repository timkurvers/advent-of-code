/* eslint-disable no-param-reassign */

import { day } from '..';

import examples from './input/examples';
import puzzleInput from './input';

const parse = input => input.split('\n').reduce((firewall, line) => {
  const [depth, range] = line.split(': ').map(Number);
  firewall[depth] = { depth, range };
  return firewall;
}, []);

// See: https://en.wikipedia.org/wiki/Triangle_wave
const position = (time, range) => (
  range - Math.abs(range - (time % (2 * range)))
);

const probe = (firewall, { delay = 0 } = {}) => {
  let caught = false;
  let severity = 0;
  let time = delay;
  for (const layer of firewall) {
    if (layer) {
      const at = position(time, layer.range - 1);
      if (at === 0) {
        severity += layer.depth * layer.range;
        caught = true;
      }
    }
    ++time;
  }
  return { caught, severity };
};

day(13).part(1).test(examples).feed(puzzleInput).solution((input) => {
  const firewall = parse(input);
  return probe(firewall).severity;
});

day(13).part(2).test(examples).feed(puzzleInput).solution((input) => {
  const firewall = parse(input);

  let delay = 0;
  let attempt;
  do {
    ++delay;
    attempt = probe(firewall, { delay });
  } while (attempt.caught);

  return delay;
});
