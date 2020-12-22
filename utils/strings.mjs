/* eslint-disable no-param-reassign */

export const toASCII = (string) => {
  if (string.length > 1) {
    return string.split('').map(toASCII);
  }
  return string.charCodeAt(0);
};

export const fromASCII = (codes) => {
  if (Array.isArray(codes)) {
    return String.fromCharCode(...codes);
  }
  return String.fromCharCode(codes);
};

export const reverse = (string) => string.split('').reverse().join('');

export const stripIndent = (strings, ...params) => {
  let source = strings.map((string, i) => (
    `${string}${params[i] || ''}`
  )).join('');

  // See: https://github.com/zspecza/common-tags/blob/master/src/stripIndentTransformer/stripIndentTransformer.js
  const match = source.match(/^[^\S\n]*(?=\S)/gm);
  const indent = match && Math.min(...match.map((el) => el.length));
  if (indent) {
    const regexp = new RegExp(`^.{${indent}}`, 'gm');
    source = source.replace(regexp, '');
  }

  // Strip leading whitespace and trailing tabs/spaces
  source = source.replace(/^\n+|[ \t]+$/g, '');

  return source;
};

// Loosely based on Ruby on Rails' Inflector
// See: https://api.rubyonrails.org/classes/ActiveSupport/Inflector.html

export const humanize = (str, { capitalize = true } = {}) => {
  str = str.replace(/(\p{Upper}+)(\p{Upper}\p{Lower})/gu, '$1 $2');
  str = str.replace(/([\p{Lower}\d])(\p{Upper})/gu, '$1 $2');
  str = str.replace(/[-_]/g, ' ');
  str = str.toLowerCase();
  if (capitalize) {
    str = str.replace(/^\p{Lower}/u, (char) => char.toUpperCase());
  }
  return str;
};

export const titleize = (str) => {
  str = humanize(str);
  str = str.replace(/ \p{Lower}/gu, (char) => char.toUpperCase());
  return str;
};
