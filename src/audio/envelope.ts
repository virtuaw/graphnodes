import { BaseNode, NodeInput, NodeOutput } from '../base';
import Tone from 'tone';

export interface Envelope {
  attack: number;
  decay: number;
  sustain: number;
  release: number;
}

export function getDefaultEnvelope() {
  return { attack: 0.1, decay: 0.2, sustain: 1.0, release: 0.8 };
}

export default class EnvelopeNode extends BaseNode<number, Tone.Envelope> {
  public envelope: Tone.Envelope;
  constructor() {
    const inputs = [
      new NodeInput('Attack', 0.1, 'attack'),
      new NodeInput('Decay', 0.2, 'decay'),
      new NodeInput('Sustain', 1, 'sustain'),
      new NodeInput('Release', 0.8, 'release')
    ];
    super(inputs, null, 'Envelope');
  }

  public calc(attack: number, decay: number, sustain: number, release: number): Envelope {
    return { attack, decay, sustain, release };
  }
}
