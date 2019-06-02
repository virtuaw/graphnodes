import { BaseNode, NodeInput } from '../base';

type Shape = 'sine' | 'triangle' | 'square' | 'sawtooth';

export interface Tremolo {
  shape: Shape;
  magnitude: number;
  speed: number;
  attack: number;
}

export function getDefaultTremolo() {
  return {
    shape: 'sine',
    magnitude: 0.5,
    speed: 1,
    attack: 0
  } as Tremolo;
}

const defaultTremolo = getDefaultTremolo();
const inputs = [
  new NodeInput('Shape', defaultTremolo.shape, 'shape'),
  new NodeInput('Magnitude', defaultTremolo.magnitude, 'magnitude'),
  new NodeInput('Speed', defaultTremolo.speed, 'speed'),
  new NodeInput('Attack', defaultTremolo.attack, 'attack')
];

export default class TremoloNode extends BaseNode<number[] | Shape, Tremolo> {
  constructor() {
    super(inputs, null, 'Tremolo');
  }
  public calc(shape: Shape, magnitude: number, speed: number, attack: number): Tremolo {
    return { shape, magnitude, speed, attack };
  }
}
