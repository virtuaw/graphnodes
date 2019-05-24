import 'web-audio-test-api';
import MidiNoteNode from './midinote';

test('Base Note conversion', () => {
  const midiNoteNode = new MidiNoteNode();
  expect(midiNoteNode.call()).toBe('C0');
});

test('Random Note conversion', () => {
  const midiNoteNode = new MidiNoteNode(52);
  expect(midiNoteNode.call()).toBe('E3');
});
