import BaseNode, { createNode } from './basenode';
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
  expect(testNodeA.output.connections.length).toBe(1);
  expect(testNodeB.inputs[0].connection).toBe(testNodeA.output);

  testNodeA.output.disconnectAll();

  expect(testNodeA.output.connections.length).toBe(0);
  expect(testNodeB.inputs[0].connection).toBe(null);
});

function add(a, b) {
  return a + b;
}
function multiply(a, b) {
  return a * b;
}
function square(a) {
  return a ** 2;
}
function getFive() {
  return 5;
}
function getSeven() {
  return 7;
}
function getThirteen() {
  return 13;
}
function consoleLog(value) {
  console.log(value);
  return value;
}
test('Convert Function to Node', () => {

  const additionNode = createNode(add);
  const fiveNode = createNode(getFive);
  const sevenNode = createNode(getSeven);

  expect(additionNode.title).toBe('add');
  expect(additionNode.inputs[0].title).toBe('a');

  fiveNode.output.connect(additionNode.inputs[0]);
  sevenNode.output.connect(additionNode.inputs[1]);

  expect(additionNode.call()).toBe(12);
});

test('Triggering nodes', (done) => {
  const additionNode = createNode(add);
  const multiplicationNode = createNode(multiply);
  const squareNode = createNode(square);
  const consoleLogNode = createNode(consoleLog);
  const fiveNode = createNode(getFive);
  const sevenNode = createNode(getSeven);
  const thirteenNode = createNode(getThirteen);

  fiveNode.output.connect(additionNode.inputs[0]);
  sevenNode.output.connect(additionNode.inputs[1]);

  additionNode.output.connect(multiplicationNode.inputs[0]);
  thirteenNode.output.connect(multiplicationNode.inputs[1]);

  multiplicationNode.output.connect(squareNode.inputs[0]);

  squareNode.output.connect(consoleLogNode.inputs[0]);

  function checkTrigger(value) {
    expect(value).toBe(24336);
    done();
  }

  const checkTriggerNode = createNode(checkTrigger);

  consoleLogNode.output.connect(checkTriggerNode.inputs[0]);

  consoleLogNode.trigger();
});
