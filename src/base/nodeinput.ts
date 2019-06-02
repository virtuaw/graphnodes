import BaseNode from './basenode';
import NodeConnector from './nodeconnector';
import NodeOutput from './nodeoutput';

/**
 * Node Input
 *
 * Represents a Node's input socket.
 */
export default class NodeInput extends NodeConnector {
  public connection: NodeOutput = null;
  public node: BaseNode<any, any> = null;
  public connectorType = 'input';

  /**
   * @param title: The input's title.
   * @param defaultValue: The default value.
   * @param key: Optional string to be used as key instead of the title.
   * @param allowInput: Whether to allow setting the value directly via user input.
   * @param allowConnection: Whether to allow a connection from other nodes.
   */
  constructor(
    public title: string = 'Input',
    public defaultValue: any = null,
    public key?: string,
    public allowInput: boolean = true,
    public allowConnection: boolean = true,
  ) {
    super();
    this.key = key || this.title.trim().toLowerCase();
  }

  /**
   * Returns true if this input is connected to another node.
   */
  get connected() {
    return !!this.connection;
  }

  /**
   * @returns value Either the connected node's output or the default value.
   */
  get value() {
    return this.connected ? this.connection.value : this.defaultValue;
  }

  /**
   * Connects this input to another output.
   *
   * @param output: The output to be connected to.
   *
   * @returns success: boolean indicating whether the connection
   *                   was successful.
   */
  public connect(output): boolean {
    if (output.isInput
        || this.connection === output
        || this.node.descendants.includes(output.node)) {
      return false;
    }

    this.connection = output;
    this.connection.connect(this);
    return true;
  }

  /**
   * Disconnects this input from existing connection
   */
  public disconnect() {
    if (this.connected) {
      const connection = this.connection;
      this.connection = null;
      connection.disconnect(this);
    }
  }

  public disconnectAll() {
    this.disconnect();
  }

  /**
   * Compability alias
   */
  get connections() {
    return this.connected ? [this.connection] : [];
  }
}
