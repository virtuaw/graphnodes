import BaseNode, { createNode } from './basenode';

import NodeInput from './nodeinput';
import NodeOutput from './nodeoutput';

function getNode(numInputs) {
  return new BaseNode([...Array(numInputs)].map((_) => new NodeInput()));
}

let testNodeA;
let testNodeB;
let testNodeC;

let output;
let input;
beforeEach(() => {
  testNodeA = getNode(1);
  testNodeB = getNode(1);
  testNodeC = getNode(1);

  output = testNodeA.output;
  input = testNodeB.inputs[0];
});

test('output | Connection check | already.connected()', () => {
  expect(output.alreadyConnected(input)).toBe(false);
});

test('Conneting output to input with checks', () => {
  // const parentNode = getNode(0);
  // const childNode = getNode(1);

  // const output = parentNode.output;
  // const input = childNode.inputs[0];

  expect(output.alreadyConnected(input)).toBe(false);
  expect(output.compareType(input)).toBe(false);
  expect(output.checkConnection(input)).toBe(true);

  const connectionResult = output.connect(input);

  expect(connectionResult).toBe(true);

  expect(output.connections[0]).toBe(input.connections[0]);

  expect(output.alreadyConnected(input)).toBe(true);
  expect(output.compareType(input)).toBe(true);
  expect(output.checkConnection(input)).toBe(false);
});

// test('Connecting/Disconnecting two Nodes', () => {
//   const nodeInput = new NodeInput();

//   const testNodeA = new BaseNode();
//   const testNodeB = new BaseNode([nodeInput]);

//   console.log(testNodeA.output.connect(testNodeB.inputs[0]));

//   console.log(testNodeA);

//   expect(testNodeA.output.connections[0]).toBe(testNodeB.inputs[0]);
//   expect(testNodeA.output.connections.length).toBe(1);
//   expect(testNodeB.inputs[0].connection).toBe(testNodeA.output);

//   testNodeA.output.disconnectAll();

//   expect(testNodeA.output.connections.length).toBe(0);
//   expect(testNodeB.inputs[0].connection).toBe(null);
// });
