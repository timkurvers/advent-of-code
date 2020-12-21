/* eslint-disable no-cond-assign */

// Declarative and recursive pattern matching
// Adjusted from: https://raganwald.com/2018/10/17/recursive-pattern-matching.html

// Creates a matcher to match against given pattern fully, returning the input
// itself when it does so, false otherwise
const entirely = (pattern) => (input) => {
  const matches = pattern(input);
  for (const match of matches) {
    if (match === input) {
      return input;
    }
  }
  return false;
};

// Creates a matcher to match a literal, returning the literal itself wrapped in
// an array on success, otherwise an empty array
const literal = (prefix) => (input) => (
  input.startsWith(prefix) ? [prefix] : []
);

// Creates a matcher to match one of given patterns, returning a list of
// successful matches
const oneOf = (...patterns) => (input) => {
  const matches = [];
  for (const pattern of patterns) {
    matches.push(...pattern(input));
  }
  return matches;
};

// Creates a matcher to match given patterns in sequence, returning a list of
// full successful matches
const sequence = (...patterns) => (input) => {
  const stack = [{
    length: 0,
    patterns: patterns.slice(),
    remaining: input,
  }];

  const matches = [];
  let current = null;
  while (current = stack.pop()) {
    const pattern = current.patterns.shift();
    const submatches = pattern(current.remaining);

    for (const submatch of submatches) {
      const length = current.length + submatch.length;

      // Dealing with a successful sequence when all patterns are exhausted
      if (current.patterns.length === 0) {
        matches.push(input.slice(0, length));
        continue;
      }

      stack.push({
        length,
        patterns: current.patterns.slice(),
        remaining: current.remaining.slice(submatch.length),
      });
    }
  }

  return matches;
};

export default {
  entirely,
  literal,
  oneOf,
  sequence,
};
