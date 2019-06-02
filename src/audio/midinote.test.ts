import 'web-audio-test-api';
import MidiNoteNode from './midinote';

test('Base Note conversion', () => {
  const midiNoteNode = new MidiNoteNode();
  expect(midiNoteNode.call()).toBe('C0');
  midiNoteNode.inputs[0].defaultValue = 52;
  expect(midiNoteNode.call()).toBe('E3');
});
