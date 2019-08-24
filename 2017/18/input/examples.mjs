import { example } from '../../../utils';

export default [
  example(`set a 1
add a 2
mul a a
mod a 5
snd a
set a 0
rcv a
jgz a -1
set a 1
jgz a -2`, 4),
  example(`snd 1
snd 2
snd p
rcv a
rcv b
rcv c
rcv d`, null, 3),
];
