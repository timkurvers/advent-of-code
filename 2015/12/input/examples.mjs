import { example } from '../../../utils';

export const partOne = [
  example('[1,2,3]', 6),
  example('{"a":2,"b":4}', 6),
  example('[[[3]]]', 3),
  example('{"a":{"b":4},"c":-1}', 3),
  example('{"a":[-1,1]}', 0),
  example('[-1,{"a":1}]', 0),
  example('[]', 0),
  example('{}', 0),
];

export const partTwo = [
  example('[1,2,3]', 6),
  example('[1,{"c":"red","b":2},3]', 4),
  example('{"d":"red","e":[1,2,3,4],"f":5}', 0),
  example('[1,"red",5]', 6),
];
