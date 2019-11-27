import { day } from '..';
import { hexmd5 } from '../../utils';

import examples from './input/examples';
import puzzleInput from './input';

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

day(5).part(1).inefficient.test(examples).feed(puzzleInput).solution(input => (
  crack(input)
));

day(5).part(2).inefficient.test(examples).feed(puzzleInput).solution(input => (
  crack(input, { positional: true })
));
