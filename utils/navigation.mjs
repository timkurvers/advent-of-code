export const Orientation = {
  UP: Math.PI * 1.5,
  DOWN: Math.PI * 0.5,
  LEFT: Math.PI,
  RIGHT: 0,
};

export const Rotation = {
  TURN_LEFT: -Math.PI * 0.5,
  TURN_RIGHT: Math.PI * 0.5,
  TURN_AROUND: Math.PI,
  NONE: 0,
};

export const dx = orientation => Math.round(Math.cos(orientation));
export const dy = orientation => Math.round(Math.sin(orientation));

export const isHorizontalOrientation = orientation => dx(orientation) !== 0;
export const isVerticalOrientation = orientation => dy(orientation) !== 0;
