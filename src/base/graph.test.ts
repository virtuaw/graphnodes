import Graph from './graph';
import BaseNode from './basenode';
import NodeInput from './nodeinput';

test('Graph instantiation', () => {
  const testGraph = new Graph();
  expect(testGraph.title).toBe('Graph');
});

test('Adding/Removing nodes', () => {
  const testGraph = new Graph();
  const testNode = new BaseNode();
  testGraph.addNode(testNode);

  expect(testGraph.nodes.length).toBe(1);

  testGraph.removeNode(testNode);

  expect(testGraph.nodes.length).toBe(0);
});

test('Adding input/output nodes and promotion/demotion', () => {
  const testGraph = new Graph();
  const inputA = new NodeInput();
  const inputB = new NodeInput();
  const testNode = new BaseNode([inputA, inputB]);

  testGraph.addNode(testNode);
  testGraph.promoteInput(testNode);

  expect(testGraph.inputNodes.length).toBe(1);
  expect(testGraph.inputs.length).toBe(2);

  testGraph.promoteOutput(testNode);

  expect(testGraph.outputNodes.length).toBe(1);
  expect(testGraph.outputs.length).toBe(1);

  testGraph.removeNode(testNode);

  expect(testGraph.outputNodes.length).toBe(0);
  expect(testGraph.inputNodes.length).toBe(0);
  expect(testGraph.inputs.length).toBe(0);
  expect(testGraph.outputs.length).toBe(0);
});

test('Connecting Nodes and aggregating connections', () => {
  const testGraph = new Graph();
  const nodeInput = new NodeInput();

  const testNodeA = new BaseNode();
  const testNodeB = new BaseNode([nodeInput]);

  testGraph.addNode(testNodeA);
  testGraph.addNode(testNodeB);
  testNodeA.output.connect(testNodeB.inputs[0]);

  expect(testGraph.connections.length).toBe(1);

  testGraph.removeNode(testNodeA);
  expect(testGraph.connections.length).toBe(0);
});
