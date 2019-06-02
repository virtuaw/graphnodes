import { BaseNode, NodeInput } from '../base';

export interface Tremolo {
  shape: 'sine' | 'triangle' | 'square' | 'sawtooth';
  magnitude: number;
  speed: number;
  attack: number;
}
