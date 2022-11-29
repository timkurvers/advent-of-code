import { Grid, solution } from '../../utils';

const parse = (input) => {
  const [algonl, image] = input.trim().split('\n\n');
  const algo = algonl.replace(/\n/g, '');
  return { algo, image };
};

const LIGHT_PIXEL = '#';
const DARK_PIXEL = '.';

const isLightPixel = (point) => point.value === LIGHT_PIXEL;

const enhance = (image, algo, { steps }) => {
  let current = Grid.from(image);
  for (let step = 0; step < steps; ++step) {
    const next = new Grid();
    const filler = algo[0] === LIGHT_PIXEL && step % 2 ? LIGHT_PIXEL : DARK_PIXEL;
    const {
      minX, maxX, minY, maxY,
    } = current;
    for (let y = minY - 2; y <= maxY + 2; ++y) {
      for (let x = minX - 2; x <= maxX + 2; ++x) {
        let index = 0;
        for (let i = 0; i < 3; ++i) {
          for (let j = 0; j < 3; ++j) {
            const pixel = current.get(x + j, y + i) ?? filler;
            const value = pixel === LIGHT_PIXEL ? 1 : 0;
            index = (index << 1) | value;
          }
        }
        next.set(x + 1, y + 1, algo[index]);
      }
    }
    current = next;
  }
  return current;
};

export const partOne = solution((input) => {
  const { algo, image } = parse(input);
  const result = enhance(image, algo, { steps: 2 });
  return result.filter(isLightPixel).length;
});

export const partTwo = solution.inefficient((input) => {
  const { algo, image } = parse(input);
  const result = enhance(image, algo, { steps: 50 });
  return result.filter(isLightPixel).length;
});
