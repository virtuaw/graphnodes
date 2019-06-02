import { BaseNode, NodeInput } from '../base';

export interface Envelope {
  attack: number;
  decay: number;
  sustain: number;
  hold: number;
  release: number;
}
