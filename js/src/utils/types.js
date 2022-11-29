export const cast = (str) => {
  const number = parseInt(str, 10);
  if (!Number.isNaN(number)) {
    return number;
  }
  return str;
};

export const clone = (obj) => JSON.parse(JSON.stringify(obj));

export const identity = (value) => value;

export const isNumber = (value) => typeof value === 'number';

export const isPrimitive = (value) => Object(value) !== value;

export const noop = () => {};
