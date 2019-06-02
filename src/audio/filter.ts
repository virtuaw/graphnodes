import { BaseNode, NodeInput } from '../base';

export interface Filter {
  type: 'lowpass' | 'highpass';
  frequency: number;
  q: number;
  env: {
    frequency: number;
    attack: number;
  };
}
