import NodeInput from './nodeinput';
import NodeOutput from './nodeoutput';

/**
 * The Base Node class.
 *
 * @param title
 */
export default class BaseNode<I, O> {
  public title = 'Base Node';
  public inputs: NodeInput[] = [];
  public output: NodeOutput = null;

  constructor(inputs?, calc?, output?, title?) {
    this.inputs = inputs || this.inputs;
    this.calc = calc || this.calc;
    this.output = output || this.output || new NodeOutput(this);
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

  public connect(idx, output) {
    this.inputs[idx].connect(output);
  }

  public disconnect(idx) {
    this.inputs[idx].disconnect();
  }
}
