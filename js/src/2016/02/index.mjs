import { Grid, solution } from '../../utils';

const directions = {
  U: 'up',
  D: 'down',
  L: 'left',
  R: 'right',
};

const parse = (input) => (
  input.trim().split('\n').map((row) => row.split('').map((dir) => directions[dir]))
);

const crack = (keypad, instructions) => {
  let code = '';
  let current = keypad.find((point) => point.value === '5');
  for (const instruction of instructions) {
    for (const step of instruction) {
      current = current[step] || current;
    }
    code += current.value;
  }
  return code;
};

export const partOne = solution((input) => {
  const keypad = Grid.from('123\n456\n789');
  const instructions = parse(input);
  return crack(keypad, instructions);
});

export const partTwo = solution((input) => {
  const keypad = Grid.from('  1  \n 234 \n56789\n ABC \n  D  ');
  const instructions = parse(input);
  return crack(keypad, instructions);
});
