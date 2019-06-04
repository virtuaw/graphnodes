import { BaseNode, NodeInput } from '../base';
import { Envelope, getDefaultEnvelope } from './envelope';
import { MidiNote } from './note';

import Tone from 'tone';

export default class PolySynthNode extends BaseNode<string | number, Tone.Midi[]> {
  public synth: Tone.PolySynth;
  constructor(numVoices: number = 4) {
    const inputs = [
      new NodeInput('Notes', [32], 'notes'),
      new NodeInput('Length', 0.2, 'length'),
      new NodeInput('Volume', -15.0, 'volume'),
      new NodeInput('Envelope', getDefaultEnvelope(), 'envelope', false),
      new NodeInput('Portamento', 0.2, 'portamento'),
    ];
    super(inputs, null, 'Poly-Synth');

    this.synth = new Tone.PolySynth(numVoices, Tone.Synth).toMaster();
    this.synth.set({
      type: 'fmsquare',
      modulationType: 'sawtooth',
    });
    this.output.enabled = false;
  }

  public calc(notes: number[], length: number, volume: number, envelope: Envelope, portamento: number) {
    // const [ notes, length, volume, envelope, portamento ] = this.inputValues;

    this.synth.set({ volume, portamento, envelope });
    this.synth.triggerAttackRelease(new Tone.Midi(notes), length);
  }
}
