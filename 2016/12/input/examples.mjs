import { example } from '../../../utils';

export default [
  example(`cpy 41 a
inc a
inc a
dec a
jnz a 2
dec a`, 42),
];
