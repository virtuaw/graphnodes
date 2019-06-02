import { BaseNode, NodeInput } from '../base';
type Shape = 'sine' | 'triangle' | 'square' | 'squaretooth';
export interface Vibrato {
  shape: Shape;
  magnitude: number;
  speed: number;
  attack: number;
}

export function getDefaultVibrato() {
  return {
    shape: 'sine',
    magnitude: 0.5,
    speed: 2,
    attack: 0
  } as Vibrato;
}

const defaultVibrato = getDefaultVibrato();
const inputs = [
  new NodeInput('Shape', defaultVibrato.shape, 'shape'),
  new NodeInput('Magnitude', defaultVibrato.magnitude, 'magnitude'),
  new NodeInput('Speed', defaultVibrato.speed, 'speed'),
  new NodeInput('Attack', defaultVibrato.attack, 'attack')
];

export default class VibratoNode extends BaseNode<string[] | number[], Vibrato> {
  constructor() {
    super(inputs, null, 'Vibrato');
  }
  public calc(shape: Shape, magnitude: number, speed: number, attack: number): Vibrato {
    return { shape, magnitude, speed, attack };
  }
}
