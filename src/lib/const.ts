export const FACES = {
  FRONT: "front",
  BACK: "back",
  LEFT: "left",
  RIGHT: "right",
};

export const STATE = {
  IDLE: "idle",
  MOVING: "moving",
};

export const MOVES = {
  w: [
    { dir: FACES.FRONT, axis: "z", step: +1 },
    { dir: FACES.LEFT, axis: "x", step: -1 },
    { dir: FACES.BACK, axis: "z", step: -1 },
    { dir: FACES.RIGHT, axis: "x", step: +1 },
  ],
  s: [
    { dir: FACES.BACK, axis: "z", step: -1 },
    { dir: FACES.RIGHT, axis: "x", step: +1 },
    { dir: FACES.FRONT, axis: "z", step: +1 },
    { dir: FACES.LEFT, axis: "x", step: -1 },
  ],
  a: [
    { dir: FACES.LEFT, axis: "x", step: -1 },
    { dir: FACES.BACK, axis: "z", step: -1 },
    { dir: FACES.RIGHT, axis: "x", step: +1 },
    { dir: FACES.FRONT, axis: "z", step: +1 },
  ],
  d: [
    { dir: FACES.RIGHT, axis: "x", step: +1 },
    { dir: FACES.FRONT, axis: "z", step: +1 },
    { dir: FACES.LEFT, axis: "x", step: -1 },
    { dir: FACES.BACK, axis: "z", step: -1 },
  ],
};

export const ATTACK_MAP = {
  0: {
    front: FACES.FRONT,
    left: FACES.LEFT,
    right: FACES.RIGHT,
    back: FACES.BACK,
  },
  1: {
    front: FACES.LEFT,
    left: FACES.BACK,
    right: FACES.FRONT,
    back: FACES.RIGHT,
  },
  2: {
    front: FACES.BACK,
    back: FACES.FRONT,
    right: FACES.LEFT,
    left: FACES.RIGHT,
  },
  3: {
    front: FACES.RIGHT,
    back: FACES.LEFT,
    left: FACES.FRONT,
    right: FACES.BACK,
  },
};
