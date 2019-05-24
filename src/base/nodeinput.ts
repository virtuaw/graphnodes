import GraphNode from './graphnode';

/**
 * Node Input
 *
 * Represents a Node's input sockets.
 *
 * @typeparam I Input type.
 */
export default class NodeInput<I> {
  public node: GraphNode<any, I>|null = null;

  /**
   * @param title: The input's title.
   * @param defaultValue: The default value.
   * @param allowInput: Whether to allow setting the value directly via user input.
   * @param allowConnection: Whether to allow a connection from other nodes.
   */
  constructor(
    public title: string = 'Input',
    public defaultValue: I = null as I,
    public allowInput: boolean = false,
    public allowConnection: boolean = true
  ) { }

  /**
   * Returns true if this input is connected to another node.
   */
  get connected() {
    return !!this.node;
  }

  /**
   * @returns value Either the connected node's output or the default value.
   */
  get value() {
    return this.connected ? this.node.call() : this.defaultValue;
  }

  /**
   * Connects this input to another node.
   *
   * @param node: Another node
   */
  public connect(node: GraphNode<any, I>): void {
    if (!this.allowConnection) {
      return;
    }

    this.node = node;
  }
}
