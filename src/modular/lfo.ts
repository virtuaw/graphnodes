import { BaseNode, NodeInput } from '../base';
import Tone from 'tone';

export default class LFONode extends BaseNode<number[] | string, number> {
  public lfo: Tone.LFO;
  public meter: Tone.Meter;
  constructor() {
    const inputs = [
      new NodeInput('Frequency', 1, 'frequency'),
      new NodeInput('Minimum', 1, 'min'),
      new NodeInput('Maximum', 10, 'max'),
      new NodeInput('Type', 'sine', 'type')
    ];

    super(inputs, null, 'Low Frequency Oscillator');
    const [ frequency, min, max ] = this.inputValues;

    this.lfo = new Tone.LFO(frequency, min, max);
    this.meter = new Tone.Meter();
    this.lfo.connect(this.meter);
    this.lfo.start();
  }

  public calc(frequency, min, max, type) {
    this.lfo.frequency.value = frequency;
    this.lfo.min = min;
    this.lfo.max = max;
    this.lfo.type = type;
    return this.meter.getValue();
  }
}
