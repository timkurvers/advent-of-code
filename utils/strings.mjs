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

export const stripIndent = (strings, ...params) => {
  let source = strings.map((string, i) => (
    `${string}${params[i] || ''}`
  )).join('');

  // Strip leading / trailing new lines
  source = source.replace(/^\s|\s$/, '');

  // See: https://github.com/zspecza/common-tags/blob/master/src/stripIndentTransformer/stripIndentTransformer.js
  const match = source.match(/^[^\S\n]*(?=\S)/gm);
  const indent = match && Math.min(...match.map((el) => el.length));
  if (indent) {
    const regexp = new RegExp(`^.{${indent}}`, 'gm');
    source = source.replace(regexp, '');
  }
  return source;
};

// Loosely based on Ruby on Rails' Inflector
// See: https://api.rubyonrails.org/classes/ActiveSupport/Inflector.html

export const humanize = (str, { capitalize = true } = {}) => {
  str = str.replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2');
  str = str.replace(/([a-z\d])([A-Z])/g, '$1 $2');
  str = str.replace(/[-_]/g, ' ');
  str = str.toLowerCase();
  if (capitalize) {
    str = str.replace(/^[a-z]/, (char) => char.toUpperCase());
  }
  return str;
};

export const titleize = (str, { allWords = true } = {}) => {
  str = humanize(str);
  if (allWords) {
    str = str.replace(/ [a-z]/g, (chars) => chars.toUpperCase());
  }
  return str;
};
