import { solution, sum } from '../../utils';

import Node from './Node';

const build = (input) => {
  const data = input.split(' ');

  const context = {
    offset: 0,
    nodes: [],
  };

  const root = Node.parse(data, context);

  return { context, root };
};

export const partOne = solution((input) => {
  const { context } = build(input);
  return sum(context.nodes.map(node => node.metadataSum));
});

export const partTwo = solution((input) => {
  const { root } = build(input);
  return root.value;
});
