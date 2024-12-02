import { solution } from '../../utils/index.js';

const parse = (input) =>
  input
    .trim()
    .split('\n')
    .map((line) => line.split(' ').map(Number));

const isSafe = (report) => {
  let sign;
  for (let i = 0; i < report.length - 1; ++i) {
    const current = report[i];
    const next = report[i + 1];

    const diff = current - next;
    const diffabs = Math.abs(diff);
    if (diff === 0) return false;
    if (diffabs < 1 || diffabs > 3) return false;

    const diffsign = Math.sign(diff);
    if (sign && diffsign !== sign) return false;
    sign = diffsign;
  }
  return true;
};

const isSafeWithRemoval = (report) => {
  const variations = report.map((level, index) => report.slice(0, index).concat(report.slice(index + 1)));
  return variations.some(isSafe);
};

export const partOne = solution((input) => {
  const reports = parse(input);
  return reports.filter(isSafe).length;
});

export const partTwo = solution((input) => {
  const reports = parse(input);
  return reports.filter(isSafeWithRemoval).length;
});
