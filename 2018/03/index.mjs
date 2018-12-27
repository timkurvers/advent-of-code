#!/usr/bin/env node --experimental-modules --no-warnings

/* eslint-disable no-param-reassign */

import { day } from '..';

import Claim from './Claim';
import input from './input';

const claims = input.map(definition => new Claim(definition));

const board = [];

const size = claims.reduce((max, next) => Math.max(max, next.maxX), 0);

for (let i = 0; i < size; ++i) {
  for (let j = 0; j < size; ++j) {
    board[i * size + j] = [];
  }
}

claims.forEach((claim) => {
  for (let i = claim.x; i < claim.maxX; ++i) {
    for (let j = claim.y; j < claim.maxY; ++j) {
      const track = board[i * size + j];
      if (track.length === 1) {
        track[0].contested = true;
      }
      track.push(claim);
      if (track.length > 1) {
        claim.contested = true;
      }
    }
  }
});

day(3).part(1).solution(() => (
  board.filter(links => links.length >= 2).length
));

day(3).part(2).solution(() => (
  claims.find(claim => !claim.contested).id
));
