import { BaseNode, NodeInput } from '../base';

export interface Delay {
  delayTime: number;
  wet: number;
  feedback: number;
}
export function getDefaultDelay() {
  return {
    delayTime: 0.0,
    wet: 0.0,
    feedback: 0.0
  } as Delay;
}

const defaultDelay = getDefaultDelay();

const inputs = [
  new NodeInput('Delay Time', defaultDelay.delayTime, 'delayTime'),
  new NodeInput('Wet', defaultDelay.wet, 'wet'),
  new NodeInput('Feedback', defaultDelay.feedback, 'feedback')
];

export default class DelayNode extends BaseNode<number[], Delay> {
  constructor() {
    super(inputs, null, 'Delay');
  }
  public calc(delayTime: number, wet: number, feedback: number): Delay {
    return { delayTime, wet, feedback };
  }
}
