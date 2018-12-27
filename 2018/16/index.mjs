#!/usr/bin/env node --experimental-modules --no-warnings

import { day } from '..';

import Sample from './Sample';
import input from './input';
import operations from './operations';

const [sampling, program] = input.split('\n\n\n\n');
const samples = sampling.split('\n\n').map(definition => new Sample(definition));

day(16).part(1).solution(() => (
  samples.filter(sample => (
    sample.probe().length >= 3
  )).length
));

day(16).part(2).solution(() => {
  const remaining = new Set(samples);
  while (remaining.size) {
    for (const sample of remaining) {
      const candidates = sample.probe().filter(operation => (
        operation.opcode === undefined
      ));
      if (candidates.length === 1) {
        const [operation] = candidates;
        operation.opcode = sample.opcode;
      }
      if (candidates.length <= 1) {
        remaining.delete(sample);
      }
    }
  }

  const data = [0, 0, 0, 0];
  const lines = program.split('\n');
  for (const line of lines) {
    const [opcode, inputA, inputB, outputC] = line.match(/\d+/g).map(Number);
    const operation = operations.find(candidate => candidate.opcode === opcode);
    operation(data, inputA, inputB, outputC);
  }
  return data[0];
});
