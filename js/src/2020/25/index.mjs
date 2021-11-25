import { solution } from '../../utils';

const SHARED = 7;
const DIVISOR = 20201227;

const parse = (input) => {
  const [cardpub, doorpub] = input.trim().split('\n').map(Number);
  return { cardpub, doorpub };
};

// Transform given subject number by looping given secret times
const transform = (subject, secret) => {
  let value = 1;
  for (let i = 0; i < secret; ++i) {
    value *= subject;
    value %= DIVISOR;
  }
  return value;
};

// Attempts to find secret for given public key
const bruteforce = (pub) => {
  let value = 1;
  let secret = 1;
  while (true) {
    value *= SHARED;
    value %= DIVISOR;
    if (value === pub) {
      return secret;
    }
    ++secret;
  }
};

export const finalPart = solution((input) => {
  const { cardpub, doorpub } = parse(input);
  const cardsecret = bruteforce(cardpub);
  const enckey = transform(doorpub, cardsecret);
  return enckey;
});
