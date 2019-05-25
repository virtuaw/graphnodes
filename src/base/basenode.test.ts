import BaseNode from './basenode';
import NodeInput from './nodeinput';
import NodeOutput from './nodeoutput';

test('Base Node instantiation', () => {
  const testNode = new BaseNode();
  expect(testNode.title).toBe('Base Node');
});

test('Default Output', () => {
  const testNode = new BaseNode();
  expect(testNode.output.title).toBe('Output');
});

test('Base Node with inputs', () => {
  const inputA = new NodeInput();
  const inputB = new NodeInput();

  const testNode = new BaseNode([inputA, inputB]);

  expect(testNode.inputs.length).toBe(2);
});

test('Connecting/Disconnecting two Nodes', () => {
  const nodeInput = new NodeInput();

  const testNodeA = new BaseNode();
  const testNodeB = new BaseNode([nodeInput]);

  testNodeA.output.connect(testNodeB.inputs[0]);

  expect(testNodeA.output.connections[0]).toBe(testNodeB.inputs[0]);
  expect(testNodeB.inputs[0].connection).toBe(testNodeA.output);

  testNodeA.output.disconnectAll();

  expect(testNodeA.output.connections.length).toBe(0);
  expect(testNodeB.inputs[0].connection).toBe(null);
});
