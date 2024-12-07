/* eslint-disable max-len */

export * from './base.js';

// snd: plays a sound with a frequency equal to the value of X.
export const snd = (program, register) => {
  program.sounds.push(program.ref(register));
  ++program.pointer;
};

// rcv: recovers the frequency of the last sound played, but only when the value of X is not zero. (If it is zero, the command does nothing.)
export const rcv = (program, register) => {
  if (program.ref(register) !== 0) {
    const lastSound = program.sounds[program.sounds.length - 1];
    program.recoveries.push(lastSound);
    program.end();
    return;
  }
  ++program.pointer;
};
