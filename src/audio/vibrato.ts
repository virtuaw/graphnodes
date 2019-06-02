import { BaseNode, NodeInput } from '../base';

export interface Vibrato {
  shape: 'sine' | 'triangle' | 'square' | 'squaretooth';
  magnitude: number;
  speed: number;
  attack: number;
}
