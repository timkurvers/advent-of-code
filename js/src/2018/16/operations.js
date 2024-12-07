/* eslint-disable max-len, no-unused-vars */

/* Addition */

// addr (add register) stores into register C the result of adding register A and register B.
export const addr = (data, inputA, inputB, outputC) => {
  data[outputC] = data[inputA] + data[inputB];
};

// addi (add immediate) stores into register C the result of adding register A and value B.
export const addi = (data, inputA, inputB, outputC) => {
  data[outputC] = data[inputA] + inputB;
};

/* Multiplication */

// mulr (multiply register) stores into register C the result of multiplying register A and register B.
export const mulr = (data, inputA, inputB, outputC) => {
  data[outputC] = data[inputA] * data[inputB];
};

// muli (multiply immediate) stores into register C the result of multiplying register A and value B.
export const muli = (data, inputA, inputB, outputC) => {
  data[outputC] = data[inputA] * inputB;
};

/* Bitwise AND */

// banr (bitwise AND register) stores into register C the result of the bitwise AND of register A and register B.
export const banr = (data, inputA, inputB, outputC) => {
  data[outputC] = data[inputA] & data[inputB];
};

// bani (bitwise AND immediate) stores into register C the result of the bitwise AND of register A and value B.
export const bani = (data, inputA, inputB, outputC) => {
  data[outputC] = data[inputA] & inputB;
};

/* Bitwise OR */

// borr (bitwise OR register) stores into register C the result of the bitwise OR of register A and register B.
export const borr = (data, inputA, inputB, outputC) => {
  data[outputC] = data[inputA] | data[inputB];
};

// bori (bitwise OR immediate) stores into register C the result of the bitwise OR of register A and value B.
export const bori = (data, inputA, inputB, outputC) => {
  data[outputC] = data[inputA] | inputB;
};

/* Assignment */

// setr (set register) copies the contents of register A into register C. (Input B is ignored.)
export const setr = (data, inputA, inputB, outputC) => {
  data[outputC] = data[inputA];
};

// seti (set immediate) stores value A into register C. (Input B is ignored.)
export const seti = (data, inputA, inputB, outputC) => {
  data[outputC] = inputA;
};

/* Greater-than testing */

// gtir (greater-than immediate/register) sets register C to 1 if value A is greater than register B. Otherwise, register C is set to 0.
export const gtir = (data, inputA, inputB, outputC) => {
  data[outputC] = inputA > data[inputB] ? 1 : 0;
};

// gtri (greater-than register/immediate) sets register C to 1 if register A is greater than value B. Otherwise, register C is set to 0.
export const gtri = (data, inputA, inputB, outputC) => {
  data[outputC] = data[inputA] > inputB ? 1 : 0;
};

// gtrr (greater-than register/register) sets register C to 1 if register A is greater than register B. Otherwise, register C is set to 0.
export const gtrr = (data, inputA, inputB, outputC) => {
  data[outputC] = data[inputA] > data[inputB] ? 1 : 0;
};

/* Equality testing */

// eqir (equal immediate/register) sets register C to 1 if value A is equal to register B. Otherwise, register C is set to 0.
export const eqir = (data, inputA, inputB, outputC) => {
  data[outputC] = inputA === data[inputB] ? 1 : 0;
};

// eqri (equal register/immediate) sets register C to 1 if register A is equal to value B. Otherwise, register C is set to 0.
export const eqri = (data, inputA, inputB, outputC) => {
  data[outputC] = data[inputA] === inputB ? 1 : 0;
};

// eqrr (equal register/register) sets register C to 1 if register A is equal to register B. Otherwise, register C is set to 0.
export const eqrr = (data, inputA, inputB, outputC) => {
  data[outputC] = data[inputA] === data[inputB] ? 1 : 0;
};

export default [
  addr,
  addi,
  mulr,
  muli,
  banr,
  bani,
  borr,
  bori,
  setr,
  seti,
  gtir,
  gtri,
  gtrr,
  eqir,
  eqri,
  eqrr,
];
