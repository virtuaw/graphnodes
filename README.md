Virtuaw-Graphnodes
==================

Virtuaw-Graphnodes provides computation graphs for graphical node based programming interfaces written in Typescript.

This library only contains the computational framework, the UI layer is kept abstract with a default Web Component implementation in Virtuaw-Graphui.

### Installation

`npm install --save-dev @virtuaw/graphnodes`

### Usage

Virtuaw-Graphnodes comes with a variety of default nodes.
Let's create a simple calculation graph.

```js
import * as vawGN from '@virtuaw/graphnodes';

// Create two number nodes for the input values.
const numberA = new vawGN.input.NumberNode();
const numberB = new vawGN.input.NumberNode();

// Create a summation node.
const sum = new vawGN.math.SumNode();

// Connect the number nodes to the summation node.
sum.connect(0, numberA.output);
sum.connect(1, numberB.output);

// Check values
console.log(numberA.output.value) // 0
console.log(numberB.output.value) // 0

// Execute calculation
console.log(sum.calc()); // 0

// Adjust values
numberA.value = 42;
numberB.value = 23;

// Success !
console.log(sum.calc()); // 67
```

As you can see, function calls are made via the result node.

When calculating the result of a single node, the affected subgraph is a tree with the resulting node at the root, the computational nodes as children and the graph's input nodes as leafs.
```
