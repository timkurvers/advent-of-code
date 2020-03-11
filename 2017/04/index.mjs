import { solution } from '../../utils';

const noDuplicates = (passphrase) => {
  const words = passphrase.split(' ');
  return words.length === new Set(words).size;
};

const noAnagrams = (passphrase) => {
  const words = passphrase.split(' ').map((word) => (
    word.split('').sort().join('')
  ));
  return words.length === new Set(words).size;
};

const process = (input, validate) => {
  const passphrases = input.split('\n');
  return passphrases.map((passphrase) => ({
    passphrase,
    valid: validate(passphrase),
  }));
};

export const partOne = solution((input) => (
  process(input, noDuplicates).filter((passphrase) => passphrase.valid).length
));

export const partTwo = solution((input) => (
  process(input, noAnagrams).filter((passphrase) => passphrase.valid).length
));
