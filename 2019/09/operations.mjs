/* eslint-disable no-param-reassign */

import operation from '../02/operations/operation';

export * from '../05/operations';

export const adjustRelativeBase = operation(9, (program) => {
  const value = program.value();
  program.relativeBase += value;
});
