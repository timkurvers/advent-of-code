import { hexmd5, solution } from '../../utils';

const mine = (secret, { startPattern } = {}) => {
  let index = 1;
  while (true) {
    const hash = hexmd5(`${secret}${index}`);
    if (hash.startsWith(startPattern)) {
      return index;
    }
    ++index;
  }
};

export const partOne = solution.inefficient(input => (
  mine(input, { startPattern: '00000' })
));

export const partTwo = solution.inefficient(input => (
  mine(input, { startPattern: '000000' })
));
