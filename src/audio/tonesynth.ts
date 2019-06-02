import { BaseNode, NodeInput } from '../base';
import Tone from 'tone';

const inputs = [
  new NodeInput('Notes', [], 'note'),
  new NodeInput('Modulation Index', 3, 'modulationIndex'),
  new NodeInput('Harmonicity', 3.4, 'harmonicity')
];

export default class ToneSynthNode extends BaseNode<any, any> {
  public synth: Tone.Synth;
  constructor() {
    super(inputs, null, 'Tone Synth');
    this.synth = new Tone.Synth({
      type: 'fmsquare',
      modulationType: 'sawtooth',
      modulationIndex: 3,
      harmonicity: 3.4
    }).toMaster();
  }

  public calc(note, modulationIndex, harmonicity) {
    // this.synth.modulationIndex.setValueAtTime(modulationIndex, 0);
    // this.synth.modulationIndex.setValueAtTime(harmonicity, 0);
    this.synth.triggerAttackRelease(note);
  }
}
