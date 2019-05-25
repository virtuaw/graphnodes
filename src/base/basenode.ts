import NodeInput from './nodeinput';

/**
 * The Base Node class.
 *
 * @param title
 */
export default class BaseNode<I, O> {
  public title = 'Base Node';
  public inputs: Array<NodeInput<I>> = [];
  public output = 'Output';

  constructor(inputs?, calc?, output?, title?) {
    this.inputs = inputs || this.inputs;
    this.calc = calc || this.calc;
    this.output = output || this.output;
    this.title =  title || this.title;
  }

  get args() {
    return this.inputs.map((input) => input.value);
  }

  public calc(...args: any): any {
    return args;
  }

  public call() {
    return this.calc(...this.args);
  }

  public connect(idx, node) {
    this.inputs[idx].connect(node);
  }

  public disconnect(idx) {
    this.inputs = this.inputs.filter((_, i) => idx !== i);
  }
}
