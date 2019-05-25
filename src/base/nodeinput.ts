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
  public connectorType = 'input';

  /**
   * @param title: The input's title.
   * @param defaultValue: The default value.
   * @param allowInput: Whether to allow setting the value directly via user input.
   * @param allowConnection: Whether to allow a connection from other nodes.
   */
  constructor(
    public title: string = 'Input',
    public defaultValue: any = null,
    public allowInput: boolean = false,
    public allowConnection: boolean = true
  ) {
    super();
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
   * @param output: The input to be connected to.
   *
   * @returns success: boolean indicating whether the connection
   *                   was successful.
   */
  public connect(output): boolean {
    if (output.isInput) {
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

  /**
   * Compability alias
   */
  public disconnectAll() {
    this.disconnect();
  }

  get connections() {
    return [this.connection];
  }
}
