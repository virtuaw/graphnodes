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

  constructor(inputs?, calc?, title?, output?) {
    this.inputs = inputs || this.inputs;
    this.calc = calc || this.calc;
    this.output = output || this.output || new NodeOutput(this);
    this.title =  title || this.title;

    this.inputs.map((input) => input.node = this);
  }

  get args() {
    return this.inputs.map((input) => input.value);
  }

  public calc(...args: any): any {
    return args;
  }

  public call() {
    return this.calc(...this.args, this.trigger);
  }

  // Trigger call either propagates to connected output nodes if there are any
  // or terminates at this node with a call.
  public trigger() {
    if (this.output.connected) {
      this.output.connections.map((connection) => connection.node.trigger());
    } else {
      this.call();
    }
  }

  public connect(idx, output) {
    this.inputs[idx].connect(output);
  }

  public disconnect(idx) {
    this.inputs[idx].disconnect();
  }
}

function getArgs(func) {
  // First match everything inside the function argument parens.
  const args = func.toString().match(/function\s.*?\(([^)]*)\)/)[1];

  // Split the arguments string into an array comma delimited.
  return args.split(',')
    .map((arg) => arg.replace(/\/\*.*\*\//, '').trim())
    .filter((arg) => arg);
}

export function createNode(func: (...args: any) => any, inputs?: NodeInput[], title?: string ) {
  const nodeTitle = title || func.name;
  const nodeInputs = inputs || getArgs(func).map((arg) => new NodeInput(arg, 0, true, true));

  return new BaseNode(nodeInputs, func, nodeTitle);
}
