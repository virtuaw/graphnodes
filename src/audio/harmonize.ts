import { BaseNode, NodeInput } from '../base';
import * as input from '../inputnodes';

/**
 * Harmonize Node
 *
 * Takes as input value a Tone.Note and an Interval of halftone steps and returns a harmonized chord
 *
 * @param note: A note given as midi value
 * @param interval An array of halftone steps as midi value intervals.
 *
 * @returns chord The chord as array of Tone.Notes
 */

type HarmonizeArgs = number | number[];
type HarmonizeResult = number[];

export default class HarmonizeNode extends BaseNode<HarmonizeArgs, HarmonizeResult> {
  constructor(
    intervals: number[] = [0, 3, 5],
    title: string = 'Harmonize'
  ) {
    const inputs = [
      new NodeInput('note', 12),
      new NodeInput('intervals', intervals)
    ];
    super(inputs, null, title);
  }

  public calc(note: number, intervals: number[]): number[] {
    return intervals.map((interval) => note + interval);
  }
}

export function createHarmonizeNode(intervals: number[] = [0, 3, 5], title: string = 'Harmonize') {
  return new HarmonizeNode(intervals, title);
}

export function createHarmonizeMajorNode() {
  return createHarmonizeNode([0, 3, 5], 'Harmonize Major');
}

export function createHarmonizeMinorNode() {
  return createHarmonizeNode([0, 3, 4], 'Harmonize Minor');
}
