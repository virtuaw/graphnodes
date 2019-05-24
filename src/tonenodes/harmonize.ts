import { NodeInput, GraphNode, input } from '..';
import Tone from 'tone';

/**
 * Harmonize Node
 *
 * Takes as input value a Tone.Note and an Interval of halftone steps and returns a harmonized chord
 *
 * @param note A Tone.Note instance.
 * @param interval An array of halftone steps as numbers.
 *
 * @returns chord The Chord as Array of Tone.Notes
 */
export default class HarmonizeNode extends GraphNode<HarmonizeArgs, HarmonizeResult> {
  public title: string = 'Harmonize Title';
  public inputs: Array<Tone.Note | number> = [
    new NodeInput<Tone.Note>('Note', new Tone.Midi(0)),
    new NodeInput<number[]>('Interval', [0, 3, 5])
  ];
  public calc = (note, intervals) => note.harmonize(intervals);
}

type HarmonizeArgs = Tone.Note | number[];
type HarmonizeResult = Tone.Note[];
