import { NodeInput, GraphNode, input } from '..';

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
  public inputs: Array<NodeInput<HarmonizeArgs>> = [
    new NodeInput<number>('Note', 0),
    new NodeInput<number[]>('Intervals', [0, 3, 5])
  ];
  public calc = (note, intervals) => intervals.map((interval) => note + interval);
}

type HarmonizeArgs = number | number[];
type HarmonizeResult = number[];
