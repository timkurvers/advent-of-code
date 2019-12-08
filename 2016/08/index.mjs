import { Grid, solution, wrap } from '../../utils';

const INSTRUCTION_MATCHER = /(rect|row|column).+?(\d+).+?(\d+)/;

const parse = input => input.split('\n').map((line) => {
  const [, opcode, a, b] = line.match(INSTRUCTION_MATCHER);
  return { opcode, a: +a, b: +b };
});

const swipe = (instructions) => {
  const grid = new Grid();
  grid.fill(0, 0, 49, 5, false);
  for (const instruction of instructions) {
    const { opcode, a, b } = instruction;
    if (opcode === 'rect') {
      for (let x = 0; x < a; ++x) {
        for (let y = 0; y < b; ++y) {
          grid.set(x, y, true);
        }
      }
    } else if (opcode === 'row') {
      const row = grid.row(a);
      const { length } = row;
      for (let i = 0; i < length; ++i) {
        const index = wrap(i - b, length);
        grid.set(i, a, row[index]);
      }
    } else if (opcode === 'column') {
      const column = grid.column(a);
      const { length } = column;
      for (let i = 0; i < length; ++i) {
        const index = wrap(i - b, length);
        grid.set(a, i, column[index]);
      }
    }
  }
  return grid;
};

export const partOne = solution((input) => {
  const grid = swipe(parse(input));
  return grid.filter(point => point.value).length;
});

export const partTwo = solution((input) => {
  const grid = swipe(parse(input));
  const output = grid.toString(point => (point && point.value ? '#' : '.'));
  console.log();
  console.log(output);
  return '<see visually above>';
});
