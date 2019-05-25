import { BaseNode, NodeInput } from '.';

export class InputNode<T> extends BaseNode<T, T> {
  public title = 'Input';

  constructor(public value: T|T[]) {
    super([], () => this.value);
  }
}

export class StringNode extends InputNode<string> {
  public inputs = [
    new NodeInput('String', '', true, false)
  ];
}

export class NumberNode extends InputNode<number> {
  public inputs = [
    new NodeInput('Number', 0, true, false)
  ];
}
