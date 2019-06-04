import { BaseNode, NodeInput } from '../base';

const inputs = [
  new NodeInput('Visualize Notes', [], 'notes')
];

export default class InstrumentNode extends BaseNode<any, number[]> {
  constructor(public activeNotes: number[] = []) {
    super(inputs, null, 'Instrument');
  }

  public noteOn(note: number) {
    this.activeNotes = [note, ...this.activeNotes];
    this.trigger();
  }

  public noteOff(note: number) {
    this.activeNotes = this.activeNotes.filter((n) => note !== n);
    this.trigger();
  }

  public getExternalNotes(notes: number[] | number): number[] {
    return [this.inputValues[0]].flat();
  }

  public calc(...args) {
    return this.activeNotes;
  }
}
