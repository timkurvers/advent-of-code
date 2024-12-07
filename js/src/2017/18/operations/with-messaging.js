/* eslint-disable max-len */

export * from './base.js';

// snd: sends the value of X to the other program.
export const snd = (program, register) => {
  const value = program.ref(register);
  program.link.inbox.push(value);
  program.sent.push(value);
  ++program.pointer;
};

// rcv: receives the next value and stores it in register X.
export const rcv = (program, register) => {
  program.waiting = true;
  if (program.inbox.length) {
    program.data[register] = program.inbox.shift();
    program.waiting = false;
    ++program.pointer;
  }
};
