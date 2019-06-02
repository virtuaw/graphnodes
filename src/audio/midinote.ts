import { BaseNode, NodeInput, input } from '..';
import Wad from 'web-audio-daw';

/**
 * Midi Note Node
 *
 * Outputs a Note in string notation based on a midi note
 * as number from either user or node input.
 */

function convertMidi(note: number) {
  return Wad.pitchesArray[note - 12];
}
export default class MidiNoteNode extends BaseNode<number, string> {
  constructor(
    note: number = 12,
    title: string = 'Midi Note'
  ) {
    super(
      [new NodeInput('midi', note, true, true)],
      convertMidi,
      title
    );
  }
}

export function createMidiNoteNode(note: number, title?) {
  return new MidiNoteNode(note, title);
}
