export const cast = (value) => {
  const number = parseInt(value, 10);
  if (!Number.isNaN(number)) {
    return number;
  }
  return value;
};

export const clone = (obj) => JSON.parse(JSON.stringify(obj));

export const identity = (value) => value;

export const isNumber = (value) => typeof value === 'number';

export const isPrimitive = (value) => (
  typeof value !== 'object' && typeof value !== 'function'
) || value === null;

export const noop = () => {};
