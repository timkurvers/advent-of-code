import { Cache, solution } from '../../utils/index.js';

const CONNECTION_MATCHER = /(?<a>\w+) (?<op>AND|OR|XOR) (?<b>\w+) -> (?<out>\w+)/g;

const parse = (input) => {
  const parts = input.trim().split('\n\n');

  const gates = new Cache({
    init: (label) => ({ label }),
  });

  for (const match of parts[1].matchAll(CONNECTION_MATCHER)) {
    const { a, b, op } = match.groups;
    const out = gates.lookup(match.groups.out);
    out.formula = { a, b, op };
  }

  for (const line of parts[0].split('\n')) {
    const [label, value] = line.split(': ');
    gates.lookup(label).value = BigInt(value);
  }

  return gates;
};

const resolve = (label, gates) => {
  const gate = gates.lookup(label);

  if (gate.value !== undefined) return gate.value;

  const a = resolve(gate.formula.a, gates);
  const b = resolve(gate.formula.b, gates);

  const { op } = gate.formula;
  if (op === 'AND') {
    gate.value = a & b;
  } else if (op === 'OR') {
    gate.value = a | b;
  } else if (op === 'XOR') {
    gate.value = a ^ b;
  } else {
    throw new Error(`unsupported op: ${op}`);
  }
  return gate.value;
};

export const partOne = solution((input) => {
  const gates = parse(input);

  let result = 0n;
  for (const gate of gates.values()) {
    if (!gate.label.startsWith('z')) continue;

    const value = resolve(gate.label, gates);
    const offset = BigInt(gate.label.slice(-2));

    result |= value << offset;
  }
  return Number(result);
});

// TODO: Ain't nobody got time for part two ;)
