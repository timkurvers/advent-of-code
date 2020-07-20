import IntcodeProgram from '../02/IntcodeProgram';
import {
  fromASCII,
  solution,
  stripIndent,
  toASCII,
} from '../../utils';

const springscript = async (input, instructions) => {
  const program = IntcodeProgram.from(input);
  program.inputs = toASCII(instructions);

  await program.run();

  const { outputs } = program;
  const result = outputs[outputs.length - 1];
  if (result > 255) {
    return result;
  }
  console.log(fromASCII(outputs));
  return null;
};

export const partOne = solution((input) => (
  // Pseudo-code:
  // if ((third === hole && fourth === ground) || first === hole)
  springscript(input, stripIndent`
    NOT C J
    AND D J
    NOT A T
    OR T J
    WALK
  `)
));
