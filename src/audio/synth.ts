import { BaseNode, NodeInput } from '../base';
import { Envelope, getDefaultEnvelope } from './envelope';
import { MidiNote } from './note';

import Tone from 'tone';

export default class SynthNode extends BaseNode<string | number, Tone.Midi[]> {
  public synth: Tone.Synth;
  constructor() {
    const inputs = [
      new NodeInput('Note', 32, 'note'),
      new NodeInput('Length', 0.2, 'length'),
      new NodeInput('Volume', -15.0, 'volume'),
      new NodeInput('Envelope', getDefaultEnvelope(), 'envelope', false),
      new NodeInput('Portamento', 0.2, 'portamento'),
    ];
    super(inputs, null, 'Synth');
    this.synth = new Tone.Synth({
      type: 'fmsquare',
      modulationType: 'sawtooth',
    }).toMaster();
    this.output.enabled = false;
  }

  public calc() {
    const [ note, length, volume, envelope, portamento ] = this.inputValues;
    const monoNote = Array.isArray(note) ? note[0] : note;
    this.synth.volume.value = volume;

    for (const key of Object.keys(envelope)) {
      this.synth.envelope[key] = envelope[key];
    }

    this.synth.portamento = portamento;

    this.synth.triggerAttackRelease(new Tone.Midi(note), length);
  }
}
