import { NodeInput, GraphNode } from '.';

export class InputNode<T> extends GraphNode<T, T> {
  public title = 'Input';
  public output = 'Value';

  constructor(public value: T|T[]) {
    super([], () => this.value);
  }
}

export class StringNode extends InputNode<string> {
  public inputs = [
    new NodeInput<string>('String', '', true, false)
  ];
}

export class NumberNode extends InputNode<number> {
  public inputs = [
    new NodeInput<number>('Number', 0, true, false)
  ];
}
