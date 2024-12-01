import { solution } from '../../utils/index.js';

const parse = (input) => (
  input.trim().split('\n').map((line) => {
    const [direction, value] = line.split(' ');
    return { direction, value: Number(value) };
  })
);

const navigate = (commands, { rtfm = false } = {}) => {
  let position = 0;
  let depth = 0;
  let aim = 0;

  for (const { direction, value } of commands) {
    if (direction === 'forward') {
      position += value;
      if (rtfm) {
        depth += aim * value;
      }
    } else if (direction === 'down') {
      if (rtfm) {
        aim += value;
      } else {
        depth += value;
      }
    } else if (direction === 'up') {
      if (rtfm) {
        aim -= value;
      } else {
        depth -= value;
      }
    }
  }

  return position * depth;
};

export const partOne = solution((input) => {
  const commands = parse(input);
  return navigate(commands);
});

export const partTwo = solution((input) => {
  const commands = parse(input);
  return navigate(commands, { rtfm: true });
});
