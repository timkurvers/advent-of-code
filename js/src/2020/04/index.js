import { solution } from '../../utils/index.js';

const PASSPORT_MATCHER = /(?<field>[^:]+):(?<value>[^\s]+)\s*/g;

const parse = (input) =>
  input
    .trim()
    .split('\n\n')
    .map((batch) => {
      const matches = Array.from(batch.matchAll(PASSPORT_MATCHER));
      return matches.reduce((passport, match) => {
        passport[match.groups.field] = match.groups.value;
        return passport;
      }, {});
    });

const PRESENCE_RULES = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

const isPresent = (passport) => PRESENCE_RULES.every((field) => field in passport);

const VALIDATION_RULES = {
  byr: (value) => value >= 1920 && value <= 2002,
  iyr: (value) => value >= 2010 && value <= 2020,
  eyr: (value) => value >= 2020 && value <= 2030,
  hgt: (value) => {
    const number = parseInt(value, 10);
    if (value.endsWith('cm')) {
      return number >= 150 && number <= 193;
    }
    if (value.endsWith('in')) {
      return number >= 59 && number <= 76;
    }
    return false;
  },
  hcl: (value) => value.match(/^#[0-9a-f]{6}$/),
  ecl: (value) => value.match(/^amb|blu|brn|gry|grn|hzl|oth$/),
  pid: (value) => value.match(/^[0-9]{9}$/),
};

const isValid = (passport) => {
  for (const [field, rule] of Object.entries(VALIDATION_RULES)) {
    const value = passport[field];
    if (!value || !rule(value)) {
      return false;
    }
  }
  return true;
};

export const partOne = solution((input) => {
  const passports = parse(input);
  return passports.filter(isPresent).length;
});

export const partTwo = solution((input) => {
  const passports = parse(input);
  return passports.filter(isValid).length;
});
