import {
  multiply, solution, sum, zip,
} from '../../utils/index.js';

const TICKET_FIELD_MATCHER = /(.+): (\d+)-(\d+) or (\d+)-(\d+)/g;
const TICKET_NUMBER_MATCHER = /\d+/g;

const parse = (input) => {
  const parts = input.trim().split('\n\n');
  const fields = Array.from(parts[0].matchAll(TICKET_FIELD_MATCHER)).map((match) => ({
    name: match[1],
    index: null,
    range1: { min: +match[2], max: +match[3] },
    range2: { min: +match[4], max: +match[5] },
  }));
  const mine = parts[1].match(TICKET_NUMBER_MATCHER).map(Number);
  const nearby = parts[2].split('\n').slice(1).map((line) => (
    line.match(TICKET_NUMBER_MATCHER).map(Number)
  ));
  return { fields, mine, nearby };
};

// Whether given value is allowed within ranges of given field
const validateValue = (value, field) => {
  const { range1, range2 } = field;
  return (
    (range1.min <= value && value <= range1.max)
    || (range2.min <= value && value <= range2.max)
  );
};

// Pre-processes given tickets, tagging invalid values found
const tag = (tickets, fields) => {
  for (const ticket of tickets) {
    ticket.invalid = [];
    for (const value of ticket) {
      if (!fields.some((field) => validateValue(value, field))) {
        ticket.invalid.push(value);
      }
    }
  }
};

export const partOne = solution((input) => {
  const { fields, nearby } = parse(input);
  tag(nearby, fields);
  return sum(nearby.flatMap((ticket) => ticket.invalid));
});

export const partTwo = solution((input, { prefix = 'departure' }) => {
  const { fields, mine, nearby } = parse(input);
  tag(nearby, fields);

  // Only consider valid nearby tickets
  const valid = nearby.filter((ticket) => !ticket.invalid.length);

  // Holds all values by index
  const valuesByIndex = zip(...valid);

  // Holds unresolved fields (no index yet) and unresolved indices (no field yet)
  const unresolvedFields = new Set(fields);
  const unresolvedIndices = new Set(fields.map((_, index) => index));

  while (unresolvedFields.size) {
    for (const index of unresolvedIndices) {
      const values = valuesByIndex[index];

      // Find fields that satisfy their requirements on all values for this index
      const matches = Array.from(unresolvedFields).filter((field) => (
        values.every((value) => validateValue(value, field))
      ));

      // Found the one and only field for this index
      if (matches.length === 1) {
        const [field] = matches;
        field.index = index;
        unresolvedFields.delete(field);
        unresolvedIndices.delete(index);
      }
    }
  }

  // Collect all field values on my ticket that start with requested prefix
  const values = fields.reduce((found, field) => {
    if (field.name.startsWith(prefix)) {
      found.push(mine[field.index]);
    }
    return found;
  }, []);
  return multiply(values);
});
