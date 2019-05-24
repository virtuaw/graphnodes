import { NodeInput, GraphNode } from '.';

export abstract class ChainNode extends GraphNode<number|number[], number|number[]> {
  public call() {
    return [...this.args].reduce((a, b) => this.calc(a, b));
  }
}

export class SumNode extends ChainNode {
  public calc = (a, b) => a + b;
}

export class MultNode extends ChainNode {
  public calc = (a, b) => a * b;
}

export class PowerNode extends ChainNode {
  public calc = (a, b) => a ** b;
}

export class DivideNode extends GraphNode<number, number> {
  public calc = (a, b) => a / b;
}
