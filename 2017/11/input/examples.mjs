import { example } from '../../../utils';

export default [
  example('ne,ne,ne', 3, 3),
  example('ne,ne,sw,sw', 0, 2),
  example('ne,ne,s,s', 2, 2),
  example('se,sw,se,sw,sw', 3, 3),
];
