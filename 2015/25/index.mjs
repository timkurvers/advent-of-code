import { solution } from '../../utils';

export default solution((input) => {
  const [row, column] = input.match(/\d+/g).map(Number);

  const start = 20151125;
  const multiplier = 252533;
  const divisor = 33554393;

  let current = start;
  let x = 1;
  let y = 1;
  let count = 0;
  let diagonal = 1;
  while (true) {
    current = (current * multiplier) % divisor;
    ++count;
    if (count === diagonal) {
      count = 0;
      x -= diagonal - 1;
      y += diagonal;
      ++diagonal;
    } else {
      ++x;
      --y;
    }

    if (row === y && column === x) {
      return current;
    }
  }
});
