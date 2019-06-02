import { BaseNode, NodeInput } from './base';

export abstract class ChainNode extends BaseNode<number|number[], number|number[]> {
  public call() {
    return [...this.inputValues].reduce((a, b) => this.calc(a, b));
  }
}

function createChainNode(nodeClass, numInputs: number = 2, inputTitles?: string[]) {
  const inputs = inputTitles ?
    inputTitles.map((title) => new NodeInput(title, 0)) :
    [...Array(numInputs).keys()].map((idx) => String.fromCharCode(idx + 97));

  return new nodeClass(inputs);
}

export class SumNode extends ChainNode {
  public title = 'Sum';
  public calc = (a, b) => a + b;
}

export class MultNode extends ChainNode {
  public title = 'Multiply';
  public calc = (a, b) => a * b;
}

export class PowerNode extends ChainNode {
  public title = 'Power';
  public calc = (a, b) => a ** b;
}

export class DivideNode extends ChainNode {
  public title = 'Divide';
  public calc = (a, b) => a / b;
}

export function createSumNode(numInputs: number = 2, inputTitles?) {
  return createChainNode(SumNode, numInputs, inputTitles);
}

export function createMultNode(numInputs: number = 2, inputTitles?) {
  return createChainNode(MultNode, numInputs, inputTitles);
}

export function createPowerNode(numInputs: number = 2, inputTitles?) {
  return createChainNode(PowerNode, numInputs, inputTitles);
}

export function createDivideNode(numInputs: number = 2, inputTitles?) {
  return createChainNode(DivideNode, numInputs, inputTitles);
}
