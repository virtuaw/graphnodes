import { BaseNode, NodeInput, input } from '..';

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
export default class HarmonizeNode extends BaseNode<HarmonizeArgs, HarmonizeResult> {
  public title: string = 'Harmonize Title';
  public inputs: NodeInput[] = [
    new NodeInput('Note', 0),
    new NodeInput('Intervals', [0, 3, 5])
  ];
  public calc = (note, intervals) => intervals.map((interval) => note + interval);
}

type HarmonizeArgs = number | number[];
type HarmonizeResult = number[];
