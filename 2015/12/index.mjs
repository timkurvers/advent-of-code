import { day } from '..';
import {
  flatMap, identity, isNumber, isPrimitive, sum,
} from '../../utils';

import examples from './input/examples';
import puzzleInput from './input';

const parse = input => JSON.parse(input);

const collect = (data, filter = identity) => {
  if (isNumber(data)) {
    return data;
  }

  if (isPrimitive(data)) {
    return 0;
  }

  if (data instanceof Array) {
    return flatMap(data, value => collect(value, filter));
  }

  const values = Object.values(data);
  if (!filter(values)) {
    return [];
  }
  return flatMap(values, value => collect(value, filter));
};

day(12).part(1).test(examples).feed(puzzleInput).solution((input) => {
  const data = parse(input);
  return sum(collect(data));
});

day(12).part(2).test(examples).feed(puzzleInput).solution((input) => {
  const data = parse(input);
  return sum(collect(data, values => !values.includes('red')));
});
