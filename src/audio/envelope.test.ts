import EnvelopeNode from './envelope';

test('Default instantiation', () => {
  const envelopeNode = new EnvelopeNode();
  envelopeNode.i.attack.inputValue = 1.0;
  expect(envelopeNode.envelope.attack).toBe(1.0);
});
