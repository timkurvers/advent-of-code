import { solution } from '../../utils/index.js';

const parse = (input) => input.trim().split('\n');

const maximize = (bank, { requested }) => {
  const out = [];

  let index = 0;
  for (let battery = 0; battery < requested; ++battery) {
    const remaining = requested - battery;

    let max = 0;
    for (let i = index; i < bank.length - remaining + 1; ++i) {
      const joltage = +bank[i];

      if (joltage > max) {
        max = joltage;
        out[battery] = +bank[i];
        index = i + 1;
      }
    }
  }

  return +out.join('');
};

export const partOne = solution((input) => {
  const banks = parse(input);

  let total = 0;
  for (const bank of banks) {
    total += maximize(bank, { requested: 2 });
  }
  return total;
});

export const partTwo = solution((input) => {
  const banks = parse(input);

  let total = 0;
  for (const bank of banks) {
    total += maximize(bank, { requested: 12 });
  }
  return total;
});
