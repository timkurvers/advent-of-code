import { solution } from '../../utils';

const parse = (input) => (
  input.trim().split('\n');
);

export const partOne = solution((input) => {
  const parsed = parse(input);
  console.log(parsed);
});
