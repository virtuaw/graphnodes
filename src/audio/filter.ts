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

export function getDefaultFilter() {
  return {
    type: 'lowpass',
    frequency: 1200,
    q: 5,
    env: {
      frequency: 800,
      attack: 0.5
    }
  } as Filter;
}

const defaultFilter = getDefaultFilter();
const inputs = [
  new NodeInput('Type', defaultFilter.type, 'type'),
  new NodeInput('Frequency', defaultFilter.frequency, 'frequency'),
  new NodeInput('Q', defaultFilter.q, 'q'),
  new NodeInput('Envelope Frequency', defaultFilter.env.frequency, 'envFrequency'),
  new NodeInput('EnvAttack', defaultFilter.env.frequency, 'envAttack')
];

export default class FilterNode extends BaseNode<string[]|number[], Filter> {
  constructor() {
    super(inputs, null, 'Filter');
  }

  public calc(
    type: 'lowpass' | 'highpass',
    frequency: number,
    q: number,
    envFrequency: number,
    envAttack: number
  ): Filter {
    return { type, frequency, q, env: { frequency: envFrequency, attack: envAttack } };
  }
}
