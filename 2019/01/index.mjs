import { solution, sum } from '../../utils';

const parse = input => input.split('\n').map(Number);

const fuelFor = (mass, { recursive } = {}) => {
  let fuel = Math.max(0, Math.floor(mass / 3) - 2);
  if (recursive && fuel > 0) {
    fuel += fuelFor(fuel, { recursive });
  }
  return fuel;
};

export const partOne = solution((input) => {
  const modules = parse(input);
  return sum(modules.map(mass => fuelFor(mass)));
});

export const partTwo = solution((input) => {
  const modules = parse(input);
  return sum(modules.map(mass => fuelFor(mass, { recursive: true })));
});
