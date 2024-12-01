import { Grid, reduceMinBy, solution } from '../../utils/index.js';

const Pixel = {
  BLACK: '0',
  WHITE: '1',
  TRANSPARENT: '2',
};

const count = (str, char) => {
  const matches = str.match(new RegExp(char, 'g'));
  return matches ? matches.length : 0;
};

const layerify = (input, { width, height } = {}) => {
  const { length } = input;
  const pixelsPerLayer = width * height;
  const layers = [];
  for (let i = 0; i < length; i += pixelsPerLayer) {
    const source = input.slice(i, i + pixelsPerLayer);
    const zeroes = count(source, '0');
    layers.push({ source, zeroes });
  }
  return layers;
};

export const partOne = solution((input, { width = 25, height = 6 }) => {
  const layers = layerify(input, { width, height });
  const candidates = layers.filter((layer) => layer.zeroes > 0);
  const layer = reduceMinBy(candidates, 'zeroes');
  return count(layer.source, '1') * count(layer.source, '2');
});

export const partTwo = solution((input, { width = 25, height = 6 }) => {
  const grid = new Grid();

  const layers = layerify(input, { width, height });
  for (const layer of layers.reverse()) {
    const pixels = layer.source.split('');
    for (const [index, pixel] of pixels.entries()) {
      const x = index % width;
      const y = (index / width) | 0;
      if (pixel !== Pixel.TRANSPARENT) {
        grid.set(x, y, pixel === Pixel.WHITE ? '#' : ' ');
      }
    }
  }

  const output = grid.toString();
  console.log();
  console.log(output);
  return '<see visually above>';
});
