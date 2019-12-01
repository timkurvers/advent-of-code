import { day } from '..';
import { sum } from '../../utils';

import examples from './input/examples';
import puzzleInput from './input';

const parse = input => input.split('\n').map(Number);

const fuelFor = (mass, { recursive } = {}) => {
  let fuel = Math.max(0, Math.floor(mass / 3) - 2);
  if (recursive && fuel > 0) {
    fuel += fuelFor(fuel, { recursive });
  }
  return fuel;
};

day(1).part(1).test(examples).feed(puzzleInput).solution((input) => {
  const modules = parse(input);
  return sum(modules.map(mass => fuelFor(mass)));
});

day(1).part(2).test(examples).feed(puzzleInput).solution((input) => {
  const modules = parse(input);
  return sum(modules.map(mass => fuelFor(mass, { recursive: true })));
});
