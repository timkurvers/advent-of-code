import IntcodeProgram from '../02/IntcodeProgram';
import { solution, stripIndent, toASCII } from '../../utils';

export const partOne = solution(async (input) => {
  const program = IntcodeProgram.from(input);

  const instructions = stripIndent`
    NOT A J
    WALK
  `;

  program.inputs = toASCII(instructions);

  await program.run();
});
