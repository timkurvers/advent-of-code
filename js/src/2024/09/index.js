import { solution } from '../../utils/index.js';

const parse = (input) => {
  const digits = input.trim().split('').map(Number);

  const blocks = [];

  let id = 0;
  for (let i = 0; i < digits.length; ++i) {
    const size = digits[i];
    const free = i % 2 !== 0;
    const block = free ? { size, free } : { id: id++, size };
    blocks.push(block);
  }

  return { blocks, lastId: id - 1 };
};

const move = (fileptr, { to: freeptr, freeidx, blocks, allowSplitFiles = true }) => {
  if (freeptr.size >= fileptr.size) {
    if (freeptr.size === fileptr.size) {
      freeptr.id = fileptr.id;
      delete freeptr.free;
    } else {
      blocks.splice(freeidx, 0, { ...fileptr });
      freeptr.size -= fileptr.size;
    }
    fileptr.free = true;
    delete fileptr.id;
  } else if (allowSplitFiles && freeptr.size < fileptr.size) {
    fileptr.size -= freeptr.size;
    freeptr.id = fileptr.id;
    delete freeptr.free;
  }
};

const checksum = (blocks) => {
  let sum = 0;
  let position = 0;
  for (const block of blocks) {
    const target = position + block.size;
    for (; position < target; ++position) {
      if (!block.free) {
        sum += block.id * position;
      }
    }
  }
  return sum;
};

export const partOne = solution((input) => {
  const { blocks } = parse(input);

  let freeidx = 0;
  let fileidx = blocks.length - 1;

  while (freeidx < fileidx) {
    const freeptr = blocks[freeidx];
    const fileptr = blocks[fileidx];

    if (!freeptr.free) {
      ++freeidx;
      continue;
    } else if (fileptr.free) {
      --fileidx;
      continue;
    }

    move(fileptr, { to: freeptr, blocks, freeidx });
  }

  return checksum(blocks);
});

export const partTwo = solution.inefficient((input) => {
  const { blocks, lastId } = parse(input);

  for (let fileid = lastId; fileid >= 0; --fileid) {
    const fileidx = blocks.findIndex((block) => block.id === fileid);
    const fileptr = blocks[fileidx];

    const freeidx = blocks.findIndex((block) => block.free && block.size >= fileptr.size);
    const freeptr = blocks[freeidx];

    if (!freeptr || freeidx >= fileidx) {
      continue;
    }

    move(fileptr, { to: freeptr, blocks, freeidx, allowSplitFiles: false });
  }

  return checksum(blocks);
});
