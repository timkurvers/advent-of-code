import IntcodeProgram from '../02/IntcodeProgram';
import {
  Grid,
  solution,
  wait,
} from '../../utils';

const Type = {
  EMPTY: 0,
  WALL: 1,
  BLOCK: 2,
  PADDLE: 3,
  BALL: 4,
};

export const partOne = solution(async (input) => {
  const program = IntcodeProgram.from(input);
  await program.run();

  const grid = new Grid();
  const { outputs } = program;
  while (outputs.length) {
    const x = outputs.shift();
    const y = outputs.shift();
    const type = outputs.shift();
    grid.set(x, y, type);
  }
  return grid.filter((point) => point && point.value === Type.BLOCK).length;
});

export const partTwo = solution(async (input) => {
  const program = IntcodeProgram.from(input);
  program.memory[0] = 2;
  program.run();

  let score = null;
  let paddleX = 0;
  let ballX = 0;

  const update = () => {
    const { outputs } = program;
    while (outputs.length) {
      const x = outputs.shift();
      const y = outputs.shift();
      const type = outputs.shift();

      if (type === Type.PADDLE) {
        paddleX = x;
      }

      if (type === Type.BALL) {
        ballX = x;
      }

      if (x === -1 && y === 0) {
        score = type;
      }
    }
  };

  while (!program.halt) {
    update();
    if (paddleX < ballX) {
      program.input(1);
    } else if (paddleX > ballX) {
      program.input(-1);
    } else {
      program.input(0);
    }

    // Note: Necessary to avoid crashing process
    await wait();
  }
  update();
  return score;
});
