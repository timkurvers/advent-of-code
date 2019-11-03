export const cast = (value) => {
  const number = parseInt(value, 10);
  if (!Number.isNaN(number)) {
    return number;
  }
  return value;
};

export const identity = value => value;

export const isNumber = value => typeof value === 'number';
