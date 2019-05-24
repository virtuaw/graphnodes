import { NodeInput, GraphNode, input } from '..';
import Wad from 'web-audio-daw';

/**
 * Midi Note Node
 *
 * Outputs a Note in string notation based on a midi note
 * as number from either user or node input.
 */
export default class MidiNoteNode extends GraphNode<number, string> {
  public title = 'Midi Note';
  public output = 'Note';
  public inputs: Array<NodeInput<number>> = [
    new NodeInput<number>('Midi Number', 0, true, true)
  ];

  constructor(note: number = 12) {
    super();
    this.inputs[0].defaultValue = note;
  }

  public calc(note: number) {
    return Wad.pitchesArray[note - 12];
  }
}
