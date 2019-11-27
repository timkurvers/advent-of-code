import { day } from '..';
import { sum } from '../../utils';

import Node from './Node';
import examples from './input/examples';
import puzzleInput from './input';

const build = (input) => {
  const data = input.split(' ');

  const context = {
    offset: 0,
    nodes: [],
  };

  const root = Node.parse(data, context);

  return { context, root };
};

day(8).part(1).test(examples).feed(puzzleInput).solution((input) => {
  const { context } = build(input);
  return sum(context.nodes.map(node => node.metadataSum));
});

day(8).part(2).test(examples).feed(puzzleInput).solution((input) => {
  const { root } = build(input);
  return root.value;
});
