import { day } from '..';

import Program from './Program';
import examples from './input/examples';
import puzzleInput from './input';

day(12).part(1).test(examples).feed(puzzleInput).solution((input) => {
  const programs = Program.from(input);
  const program0 = programs.find(program => program.id === 0);
  return program0.group.size;
});

day(12).part(2).test(examples).feed(puzzleInput).solution((input) => {
  const programs = Program.from(input);

  const hash = group => (
    Array.from(group).map(program => program.id).sort().join('-')
  );

  const groups = programs.reduce((set, program) => {
    const id = hash(program.group);
    set.add(id);
    return set;
  }, new Set());

  return groups.size;
});
