import { solution, sum } from '../../utils';

export const partOne = solution((input) => {
  const diffs = input.split('\n').map((line) => {
    const row = line.split('\t').map(Number);
    return Math.max(...row) - Math.min(...row);
  });
  return sum(diffs);
});

export const partTwo = solution((input) => {
  const divisions = input.split('\n').map((line) => {
    const row = line.split('\t').map(Number);
    for (let i = 0; i < row.length; ++i) {
      for (let j = 0; j < row.length; ++j) {
        if (i === j) continue;
        const division = row[i] / row[j];
        if (Number.isInteger(division)) {
          return division;
        }
      }
    }
    return 0;
  });
  return sum(divisions);
});
