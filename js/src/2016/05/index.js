import { hexmd5, solution } from '../../utils/index.js';

const crack = (door, { positional = false } = {}) => {
  let index = 0;
  const password = positional ? new Array(8).fill('') : [];
  while (true) {
    const hash = hexmd5(`${door}${index}`);
    if (hash.startsWith('00000')) {
      if (positional) {
        const offset = +hash[5];
        if (offset < 8 && !password[offset]) {
          // eslint-disable-next-line prefer-destructuring
          password[offset] = hash[6];
        }
      } else {
        password.push(hash[5]);
      }
      if (password.every(Boolean) && password.length === 8) {
        break;
      }
    }

    ++index;
  }
  return password.join('');
};

export const partOne = solution.inefficient((input) => crack(input));

export const partTwo = solution.inefficient((input) => crack(input, { positional: true }));
