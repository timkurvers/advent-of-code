import { solution } from '../../utils';

import Program from './Program';

export const partOne = solution((input) => {
  const programs = Program.from(input);
  const program0 = programs.find(program => program.id === 0);
  return program0.group.size;
});

export const partTwo = solution((input) => {
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
