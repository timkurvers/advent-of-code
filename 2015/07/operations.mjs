const MAX = 1 << 16;

export const and = (a, b) => a & b;
export const lshift = (a, b) => a << b;
export const not = (a) => MAX - a - 1;
export const or = (a, b) => a | b;
export const rshift = (a, b) => a >>> b;
