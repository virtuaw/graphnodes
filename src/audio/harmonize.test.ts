import 'web-audio-test-api';
import HarmonizeNode from './harmonize';

test('Base Note conversion', () => {
  const harmonizeNode = new HarmonizeNode();
  harmonizeNode.i.note.defaultValue = 12;
  expect(harmonizeNode.call()).toMatchObject([12, 15, 17]);
});
