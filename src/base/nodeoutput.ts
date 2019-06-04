import BaseNode from './basenode';
import NodeConnector from './nodeconnector';
import NodeInput from './nodeinput';

/**
 * Node Output
 *
 * Represents a Node's output socket.
 */
export default class NodeOutput extends NodeConnector {
  public connections: NodeInput[] = [];
  public connectorType = 'output';

  /**
   * @param node: The parent node of the output.
   * @param title: The output's title.
   */
  constructor(
    public node: BaseNode<any, any>,
    public title: string = 'Output',
    public enabled: boolean = true
  ) {
    super();
  }

  /**
   * Returns true if this input is connected to another node.
   */
  get connected() {
    return this.connections.length > 0;
  }

  /**
   * @returns value Either the connected node's output or the default value.
   */
  get value() {
    return this.node.call();
  }

  public trigger() {
    this.active = true;
    this.connections.map((connection) => connection.trigger());
    setTimeout(() => this.active = false, 500);
  }

  /**
   * Connects this output to another input.
   *
   * @param input: The input to be connected to.
   *
   * @returns success: boolean indicating whether the connection
   *                   was successful.
   */
  public connect(input): boolean {
    if (!this.enabled
        || input.isOutput
        || !input.allowConnection
        || this.node.descendants.includes(input.node)) {
      return false;
    }

    if (input.connection !== this) {
      input.connect(this);
    }
    // this.connections.filter((connection) => connection !== input);
    this.connections.push(input);
    return true;
  }

  /**
   * Disconnects a specific input from this output
   *
   * @param input: The input to disconnect.
   */
  public disconnect(input) {
    this.connections = this.connections.filter((conn) => conn !== input);
    input.disconnect();
  }

  /**
   * Disconnects all inputs from this output
   */
  public disconnectAll() {
    this.connections.map((conn) => conn.disconnect());
  }

}
