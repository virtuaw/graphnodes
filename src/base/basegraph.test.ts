import BaseGraph from './basegraph';
import BaseNode from './basenode';
import NodeInput from './nodeinput';

test('BaseGraph instantiation', () => {
  const testBaseGraph = new BaseGraph();
  expect(testBaseGraph.title).toBe('Graph');
});

test('Adding/Removing nodes', () => {
  const testBaseGraph = new BaseGraph();
  const testNode = new BaseNode();
  testBaseGraph.addNode(testNode);

  expect(testBaseGraph.nodes.length).toBe(1);

  testBaseGraph.removeNode(testNode);

  expect(testBaseGraph.nodes.length).toBe(0);
});

test('Adding input/output nodes and promotion/demotion', () => {
  const testBaseGraph = new BaseGraph();
  const inputA = new NodeInput();
  const inputB = new NodeInput();
  const testNode = new BaseNode([inputA, inputB]);

  // Add Node and promote to input
  testBaseGraph.addNode(testNode);
  testBaseGraph.promoteInput(testNode);

  expect(testBaseGraph.inputNodes.length).toBe(1);
  expect(testBaseGraph.inputs.length).toBe(2);

  // Promote to output
  testBaseGraph.promoteOutput(testNode);

  expect(testBaseGraph.outputNode).toBe(testNode);

  // Remove node
  testBaseGraph.removeNode(testNode);

  expect(testBaseGraph.outputNode).toBe(null);
  expect(testBaseGraph.inputNodes.length).toBe(0);
  expect(testBaseGraph.inputs.length).toBe(0);
});

test('Connecting Nodes and aggregating connections', () => {
  const testBaseGraph = new BaseGraph();
  const nodeInput = new NodeInput();
  const testNodeA = new BaseNode();
  const testNodeB = new BaseNode([nodeInput]);

  // Add nodes and connect
  testBaseGraph.addNode(testNodeA);
  testBaseGraph.addNode(testNodeB);
  testNodeA.output.connect(testNodeB.inputs[0]);

  expect(testBaseGraph.connections.length).toBe(1);

  // Remove Node
  testBaseGraph.removeNode(testNodeA);
  expect(testBaseGraph.connections.length).toBe(0);
});
