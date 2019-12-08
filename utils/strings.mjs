/* eslint-disable no-param-reassign */

// Loosely based on Ruby on Rails' Inflector
// See: https://api.rubyonrails.org/classes/ActiveSupport/Inflector.html

export const humanize = (str, { capitalize = true } = {}) => {
  str = str.replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2');
  str = str.replace(/([a-z\d])([A-Z])/g, '$1 $2');
  str = str.replace(/[-_]/g, ' ');
  str = str.toLowerCase();
  if (capitalize) {
    str = str.replace(/^[a-z]/, char => char.toUpperCase());
  }
  return str;
};

export const titleize = (str, { allWords = true } = {}) => {
  str = humanize(str);
  if (allWords) {
    str = str.replace(/ [a-z]/g, chars => chars.toUpperCase());
  }
  return str;
};
