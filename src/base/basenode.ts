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
  public id: number;

  constructor(inputs?, calc?, title?, output?) {
    this.inputs = inputs || this.inputs;
    this.calc = calc || this.calc;
    this.output = output || this.output || new NodeOutput(this);
    this.title =  title || this.title;

    this.inputs.map((input) => input.node = this);

    this.id = Math.round(Math.random() * 100000);
  }

  // Shorthand
  get o(): NodeOutput {
    return this.output;
  }
  get i(): { [index: string]: NodeInput } {
    const inputObject = {};
    this.inputs.map((input) => inputObject[input.key] = input);
    return inputObject;
  }

  get inputValues(): any[] {
    return this.inputs.map((input) => input.value);
  }

  get descendants(): Array<BaseNode<any, any>> {
    return this.output.connections.reduce<Array<BaseNode<any, any>>>((desc, conn) => {
      return desc.concat(conn.node.descendants.filter((node) => !desc.includes(node)));
    }, [this] as Array<BaseNode<any, any>>);
  }

  public call() {
    this.beforeCall();
    this.update();
    this.afterCall();
  }

  public update() {
    this.output.setValue(this.calc(...this.inputValues));
  }

  public trigger() {
    if (this.output.connected) {
      this.output.trigger();
    }
    this.call();
  }

  /**
   * The computation of the node.
   * This should be left pure, as any side effects can be implemented
   * using the beforeCall and afterCall methods.
   */
  public calc(...args: any): any {
    return args;
  }

  public beforeCall() {
    return;
  }

  public afterCall() {
    return;
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
  const nodeInputs = inputs || getArgs(func).map(([arg, val = 0]) => {
    return new NodeInput(null, arg, val);
  });

  return new BaseNode(nodeInputs, func, nodeTitle);
}
