import IntcodeProgram from '../02/IntcodeProgram';
import {
  combine,
  fromASCII,
  solution,
  stripIndent,
} from '../../utils';

export const finalPart = solution.inefficient(async (input) => {
  const program = IntcodeProgram.from(input);

  const instructions = stripIndent`
    west
    take fixed point
    north
    take sand
    south
    east
    east
    take asterisk
    north
    north
    take hypercube
    north
    take coin
    north
    take easter egg
    south
    south
    south
    west
    north
    take spool of cat6
    north
    take shell
    west
    north
  `;

  program.input(instructions);

  const items = [
    'fixed point',
    'sand',
    'asterisk',
    'hypercube',
    'coin',
    'easter egg',
    'spool of cat6',
    'shell',
  ];

  // Brute-force the correct combination of items
  for (const combination of combine(items)) {
    const recollect = [];
    for (const item of items) {
      if (!combination.includes(item)) {
        program.input(`drop ${item}\n`);
        recollect.push(item);
      }
    }
    program.input('inv\n');
    program.input('north\n');
    for (const item of recollect) {
      program.input(`take ${item}\n`);
    }
  }

  await program.run();

  const output = fromASCII(program.outputs);
  return output.match(/\d{10}/)[0];
});
