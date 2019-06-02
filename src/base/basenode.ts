import NodeInput from './nodeinput';
import NodeOutput from './nodeoutput';

interface Node<I, O> {
  title: string;
  calc: (...args: I[]) => O;
}

/**
 * The Base Node class.
 *
 * @param title
 */
export default class BaseNode<I, O> implements Node<I, O> {
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

  // Shorthand
  get o(): NodeOutput {
    return this.output;
  }
  get i(): { [index: string]: NodeInput } {
    const inputObject = {};
    this.inputs.map((input) => inputObject[input.title] = input);
    return inputObject;
  }

  get inputValues() {
    return this.inputs.map((input) => input.value);
  }

  public calc(...args: any): any {
    console.log('calc');
    return args;
  }

  public call() {
    return this.calc(...this.inputValues);
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
}

function getArgs(func) {
  // First match everything inside the function argument parens.
  const args = func.toString().match(/function\s.*?\(([^)]*)\)/)[1];

  // Split the arguments string into an array comma delimited.
  return args.split(',')
    .map((arg) => arg.replace(/\/\*.*\*\//, '').trim())
    .filter((arg) => arg);
}

export function createNode(
  func: (...args: any) => any,
  inputs?: NodeInput[],
  title?: string
) {
  const nodeTitle = title || func.name;
  const nodeInputs = inputs || getArgs(func).map((arg) => new NodeInput(arg, 0, true, true));

  return new BaseNode(nodeInputs, func, nodeTitle);
}
