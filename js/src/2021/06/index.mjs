import { solution, sum } from '../../utils';

const parse = (input) => (
  input.trim().split(',').map(Number)
);

const count = (fish, { days }) => {
  // Each slot contains the amount of fish for that lifetime
  const slots = 9;
  const counters = new Array(slots).fill(0);

  // Allocate initial fish lifetimes into their slots
  for (const entry of fish) {
    ++counters[entry];
  }

  // Fish age (shift all counters left), birth new ones!
  for (let day = 1; day <= days; ++day) {
    const birthing = counters.shift();
    counters[slots - 1] = 0;
    counters[6] += birthing;
    counters[8] += birthing;
  }
  return sum(counters);
};

export const partOne = solution((input) => {
  const fish = parse(input);
  return count(fish, { days: 80 });
});

export const partTwo = solution((input) => {
  const fish = parse(input);
  return count(fish, { days: 256 });
});
