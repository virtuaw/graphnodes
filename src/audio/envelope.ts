import { BaseNode, NodeInput } from '../base';

export interface Envelope {
  attack: number;
  decay: number;
  sustain: number;
  hold: number;
  release: number;
}

export function getDefaultEnvelope() {
  return {
    attack: 0.5,
    decay: 1.0,
    sustain: 0.0,
    hold: 3.14,
    release: 1.0
  } as Envelope;
}

const defaultEnvelope = getDefaultEnvelope();

const inputs = [
  new NodeInput('Attack', defaultEnvelope.attack, 'attack'),
  new NodeInput('Decay', defaultEnvelope.decay, 'decay'),
  new NodeInput('Sustain', defaultEnvelope.sustain, 'sustain'),
  new NodeInput('Hold', defaultEnvelope.hold, 'hold'),
  new NodeInput('Release', defaultEnvelope.release, 'release')
];

export default class EnvelopeNode extends BaseNode<number[], Envelope> {
  constructor() {
    super(inputs, null, 'Envelope');
  }
  public calc(
    attack: number,
    decay: number,
    sustain: number,
    hold: number,
    release: number
  ): Envelope {
    return { attack, decay, sustain, hold, release };
  }
}
