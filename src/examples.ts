import { BaseNode, NodeInput, input, math, audio } from './index';

const { NumberNode } = input;

const numberA = new NumberNode(5);
const numberB = new NumberNode(2);

const test = new BaseNode<number, string>(
  [new NodeInput('a', 0), new NodeInput('a', 0)],
  (a, b) => a.toString() + ', ' + b.toString()
);

console.log('Test node:', test, test.call());

const note = new input.NumberNode(15);

const interval = new input.NumberNode([0, 3, 5, 8, 9]);
const harmonize = new audio.HarmonizeNode();
console.log(harmonize);

harmonize.connect(0, note);
harmonize.connect(1, interval);

console.log('Harmonize Node:', harmonize, harmonize.call());

const sum = new math.SumNode([
  new NodeInput('a'),
  new NodeInput('b'),
  new NodeInput('c')
]);

sum.connect(0, numberA);
sum.connect(1, numberB);
sum.connect(2, numberB);

console.log('Sum Node:', sum, sum.call());
