import { BaseNode, NodeInput } from './base';

export class InputNode<T> extends BaseNode<T, T> {
  public title = 'Input';

  constructor(public inputs: NodeInput[] = []) {
    super(inputs, null, 'Input');
  }

  public call(): T|T[] {
    return this.inputs.length === 1 ? this.inputs[0].value : this.inputValues;
  }
}
const stringInputs = [new NodeInput('String', '', 'string')];
export class StringNode extends InputNode<string> {
  constructor() {
    super(stringInputs);
  }
}

const numberInputs = [new NodeInput('Number', 0, 'number')];
export class NumberNode extends InputNode<number> {
  constructor() {
    super(numberInputs);
  }
}
