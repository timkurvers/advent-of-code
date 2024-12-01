import { solution } from '../../utils/index.js';

const parse = (input) => (
  input.trim().split('\n')
);

export const partOne = solution((input) => {
  const parsed = parse(input);
  console.log(parsed);
});
