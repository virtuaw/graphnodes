import { BaseNode, NodeInput } from '../base';

export default class InstrumentNode extends BaseNode<any, number[]> {
  constructor(public activeNotes: number[] = []) {
    super([], null, 'Instrument');
  }

  public noteOn(note: number) {
    this.activeNotes = [note, ...this.activeNotes];
    this.trigger();
  }

  public noteOff(note: number) {
    this.activeNotes = this.activeNotes.filter((n) => note !== n);
  }

  public call() {
    if (this.activeNotes.length >= 1) {
      return this.activeNotes;
    }
  }
}
