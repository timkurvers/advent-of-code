import { solution } from '../../utils';

const generate = (initial, { length } = {}) => {
  let a = initial;
  while (a.length < length) {
    const b = a.replace(/\d/g, (_char, index, str) => (
      str[str.length - 1 - index] === '1' ? '0' : '1'
    ));
    a = `${a}0${b}`;
  }
  return a.slice(0, length);
};

const checksum = (data) => {
  const { length } = data;
  const out = [];
  for (let i = 0; i < length; i += 2) {
    const digit = data[i] === data[i + 1] ? '1' : '0';
    out.push(digit);
  }
  if (out.length % 2 === 0) {
    return checksum(out);
  }
  return out.join('');
};

export const partOne = solution((input, { length = 272 }) => {
  const data = generate(input, { length });
  return checksum(data);
});

export const partTwo = solution.inefficient((input) => {
  const data = generate(input, { length: 35651584 });
  return checksum(data);
});
