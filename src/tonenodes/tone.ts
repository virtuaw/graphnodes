import { input } from '..';
import Tone from 'tone';

export default class NoteInputNode extends input.InputNode<Tone.Note> {
  constructor(public note: number) {
    super(Tone.Midi(note));
  }
}
