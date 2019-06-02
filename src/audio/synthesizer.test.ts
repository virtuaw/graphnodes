import 'web-audio-test-api';
import SynthesizerNode from './synthesizer';

test('Class instantiation and simple updates', () => {
  const synthNode = new SynthesizerNode();
  synthNode.i.pitch.defaultValue = 'C4';
  synthNode.trigger();
  expect(synthNode.wad.pitch).toBe('C4');
});
