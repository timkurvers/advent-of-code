#!/usr/bin/env node --experimental-modules --no-warnings

import { day } from '..';
import { sum } from '../../utils';

import Node from './Node';
import input from './input';

const data = input.split(' ');

const context = {
  offset: 0,
  nodes: [],
};

const root = Node.parse(data, context);

day(8).part(1).solution(() => (
  sum(context.nodes.map(node => node.metadataSum))
));

day(8).part(2).solution(() => (
  root.value
));
