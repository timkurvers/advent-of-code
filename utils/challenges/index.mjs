export { default as Challenge } from './Challenge';

export const inefficiency = (fn) => {
  const wrapper = (...args) => fn(...args);
  wrapper.inefficient = (...args) => {
    const result = wrapper(...args);
    result.inefficient = true;
    return result;
  };
  return wrapper;
};

export const example = inefficiency((input, expected, args = {}) => ({
  input, expected, args,
}));

export const solution = inefficiency((fn = () => {}) => fn);
