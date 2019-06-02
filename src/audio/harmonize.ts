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

function harmonize(note, intervals) {
  return intervals.map((interval) => note + interval);
}
export default class HarmonizeNode extends BaseNode<HarmonizeArgs, HarmonizeResult> {
  constructor(
    intervals: number[] = [0, 3, 5],
    title: string = 'Harmonize'
  ) {
    super(
      [new NodeInput('note', 12), new NodeInput('intervals', intervals)],
      harmonize,
      title
    );
  }
}

type HarmonizeArgs = number | number[];
type HarmonizeResult = number[];

export function createHarmonizeNode(intervals: number[] = [0, 3, 5], title: string = 'Harmonize') {
  return new HarmonizeNode(intervals, title);
}

export function createHarmonizeMajorNode() {
  return createHarmonizeNode([0, 3, 5], 'Harmonize Major');
}

export function createHarmonizeMinorNode() {
  return createHarmonizeNode([0, 3, 4], 'Harmonize Minor');
}
