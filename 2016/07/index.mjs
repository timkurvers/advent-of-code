import { flatMap, solution } from '../../utils';

const parse = input => (
  input.split('\n').map((address) => {
    const split = address.split(/\[|\]/);
    const hypernets = split.filter((_, index) => index % 2 === 1);
    const words = split.filter((_, index) => index % 2 === 0);
    return { hypernets, words };
  })
);

const hasABBA = (word) => {
  for (let i = 0; i < word.length - 3; ++i) {
    const [a, b, c, d] = word.slice(i, i + 4);
    if (a === d && b === c && a !== b) {
      return true;
    }
  }
  return false;
};

const noABBA = word => !hasABBA(word);

const supportsTLS = (address) => {
  const { hypernets, words } = address;
  return words.some(hasABBA) && hypernets.every(noABBA);
};

const findABAs = (word) => {
  const found = [];
  for (let i = 0; i < word.length - 2; ++i) {
    const aba = word.slice(i, i + 3);
    if (aba[0] === aba[2] && aba[0] !== aba[1]) {
      found.push(aba);
    }
  }
  return found;
};

const supportsSSL = (address) => {
  const { hypernets, words } = address;
  const abas = flatMap(words, findABAs);
  return abas.some((aba) => {
    const bab = `${aba[1]}${aba[0]}${aba[1]}`;
    return hypernets.some(word => word.includes(bab));
  });
};

export const partOne = solution(input => (
  parse(input).filter(supportsTLS).length
));

export const partTwo = solution(input => (
  parse(input).filter(supportsSSL).length
));
