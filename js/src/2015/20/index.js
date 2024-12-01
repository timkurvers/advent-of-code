import { solution } from '../../utils/index.js';

const distribute = ({ numHouses, perHouse, maxDeliveries = Infinity }) => {
  const houses = new Array(Math.ceil(numHouses)).fill(0);
  for (let elf = 1; elf < numHouses; ++elf) {
    for (
      let house = elf, delivery = 0;
      delivery < maxDeliveries && house < numHouses;
      ++delivery, house += elf
    ) {
      houses[house] += elf * perHouse;
    }
  }
  return houses;
};

export const partOne = solution.inefficient((target) => {
  const perHouse = 10;
  const houses = distribute({
    numHouses: target / perHouse,
    perHouse,
  });
  return houses.findIndex((house) => house >= target);
});

export const partTwo = solution((target, { maxDeliveries = 50 }) => {
  const perHouse = 11;
  const houses = distribute({
    numHouses: target / perHouse,
    perHouse,
    maxDeliveries,
  });
  return houses.findIndex((house) => house >= target);
});
