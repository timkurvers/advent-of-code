import { day } from '..';

import examples from './input/examples';
import puzzleInput from './input';

const noDuplicates = (passphrase) => {
  const words = passphrase.split(' ');
  return words.length === new Set(words).size;
};

const noAnagrams = (passphrase) => {
  const words = passphrase.split(' ').map(word => (
    word.split('').sort().join('')
  ));
  return words.length === new Set(words).size;
};

const process = (input, validate) => {
  const passphrases = input.split('\n');
  return passphrases.map(passphrase => ({
    passphrase,
    valid: validate(passphrase),
  }));
};

day(4).part(1).test(examples).feed(puzzleInput).solution(input => (
  process(input, noDuplicates).filter(passphrase => passphrase.valid).length
));

day(4).part(2).test(examples).feed(puzzleInput).solution(input => (
  process(input, noAnagrams).filter(passphrase => passphrase.valid).length
));
