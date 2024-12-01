/* eslint-disable consistent-return */

import { permute, solution, toASCII } from '../../utils/index.js';

// Transforms a given string into a mapping (e.g 'cbae' -> [2, 1, 0, 4])
const createMapping = (str) => str.split('').map((c) => toASCII(c) - 97);

const parse = (input) => {
  const corrected = input.trim().replace(/\|\n/g, '|');
  const entries = corrected.split('\n').map((entry) => {
    const [rawPatterns, rawSignals] = entry.split('|').map((part) => part.trim().split(' '));
    const patterns = rawPatterns.map(createMapping);
    const signals = rawSignals.map(createMapping);
    return { patterns, signals };
  });
  return entries;
};

const TL = 1 << 0;
const TP = 1 << 1;
const TR = 1 << 2;
const MD = 1 << 3;
const BL = 1 << 4;
const BT = 1 << 5;
const BR = 1 << 6;

const bits = [TL, TP, TR, MD, BL, BT, BR];

// Mask together segments that apply for each digit (by index)
const digits = [
  TP | TL | TR | BL | BR | BT,
  TR | BR,
  TP | TR | MD | BL | BT,
  TP | TR | MD | BR | BT,
  TL | TR | MD | BR,
  TP | TL | MD | BR | BT,
  TP | TL | MD | BL | BR | BT,
  TP | TR | BR,
  TP | TL | TR | MD | BL | BR | BT,
  TP | TL | TR | MD | BR | BT,
];

// Counts the number of segments in the given mask (e.g. 0b110011 -> 4)
const countSegments = (mask) => mask.toString(2).match(/1/g).length;

export const partOne = solution((input) => {
  const entries = parse(input);
  const lengths = [digits[1], digits[4], digits[7], digits[8]].map(countSegments);

  let sum = 0;
  for (const { signals } of entries) {
    for (const signal of signals) {
      if (lengths.includes(signal.length)) {
        ++sum;
      }
    }
  }
  return sum;
});

const createMaskFor = (mapping, config) => mapping.reduce((acc, m) => acc | config[m], 0);

const findDigitByMask = (mask) => {
  for (const [digit, config] of digits.entries()) {
    if (config === mask) {
      return digit;
    }
  }
  return null;
};

// Finds the correct wire-mapping for the given entry
// 1. Patterns (from input) are provided as mappings (e.g. [6, 1, 3, 2, 4, 0])
// 2. Brute-force all permutations of segment placements, generating unique
//    masks as we go along, matching those to the digit masks
// 3. The correct permutation has been found when all patterns match a digit
const findConfigurationFor = (entry) => {
  for (const permutation of permute(bits)) {
    const matches = entry.patterns.every(
      (mapping) => findDigitByMask(createMaskFor(mapping, permutation)) != null,
    );
    if (matches) {
      return permutation;
    }
  }
};

// Decodes signal using the given configuration (e.g. 'cdfeb' -> 5)
const decodeSignal = (signal, config) => {
  const mask = createMaskFor(signal, config);
  const digit = findDigitByMask(mask);
  return digit;
};

export const partTwo = solution((input) => {
  const entries = parse(input);

  let sum = 0;
  for (const entry of entries) {
    const config = findConfigurationFor(entry);
    sum += entry.signals.reduce((acc, signal) => acc * 10 + decodeSignal(signal, config), 0);
  }
  return sum;
});
