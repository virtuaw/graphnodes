import BaseNode from './basenode';
import NodeConnector from './nodeconnector';
import NodeOutput from './nodeoutput';

/**
 * Node Input
 *
 * Represents a Node's input socket.
 */
export default class NodeInput extends NodeConnector {
  public key: string;
  public connections: NodeOutput[] = [];
  /**
   * Since an input node can only have one output, we can use a
   * connection property (singular) to store this connection in addition
   * to using the connections (plural) array for compatibility with the
   * base class and shared functionality with the output connector.
   */
  get connection(): NodeOutput {
    return this.connected ? this.connections[0] : null;
  }

  /**
   * Indicates that this is an input.
   */
  public connectorType: 'input' | 'output' = 'input';

  /**
   * Allows for custom user input without there being a connection present.
   */

  get inputValue() {
    return this.defaultValue;
  }

  set inputValue(value) {
    this.defaultValue = value;
  }
  // public inputValue: any = null;

  /**
   * @param node: The associated node.
   * @param title: The input's title.
   * @param defaultValue: The default value.
   * @param key: Optional string to be used as key instead of the title.
   * @param allowInput: Whether to allow setting the value directly via user input.
   * @param allowConnection: Whether to allow a connection from other nodes.
   */
  constructor(
    public node: BaseNode<any, any> = null,
    public title: string = 'Input',
    public defaultValue: any = null,
    key?: string,
    public allowInput: boolean = true,
    public allowConnection: boolean = true,
  ) {
    super(title, key);
    this.key = key || title.trim().toLowerCase();
  }

  /**
   * @returns value Either the connected node's output or the default value.
   */
  get value() {
    return this.connected ? this.connection.value : this.inputValue;
  }

  /**
   * Triggering change in the graph.
   */
  public trigger(): void {
    this.active = true;
    this.node.trigger();
    setTimeout(() => this.active = false, 500);
  }

  /**
   * Check whether a connection with this connector would result in a cycle,
   * i.e. if the connector's associated node is a descendant of this connector's
   * associated node. Since every Node is it's own descendant, this also takes care
   * of checking whether a node would be connecting to itself.
   *
   * (This would also fit the definition of a cycle but still might be unexpected to
   * some.)
   *
   * @param connector: The connection target.
   */
  public wouldBeCyclic(connector: NodeConnector) {
    return this.node.descendants.includes(connector.node);
  }

  /**
   * In addition to the existing check, return false if this connection would
   * result in a cycle, e.g. if the target's node is a descendant of
   * this connector's associated node.
   *
   * @param connector: The connection target.
   */
  public checkConnection(connector: NodeConnector): boolean {
    return super.checkConnection(connector) && !this.wouldBeCyclic(connector);
  }
  // /**
  //  * Connects this input to another output.
  //  *
  //  * @param output: The output to be connected to.
  //  *
  //  * @returns success: boolean indicating whether the connection
  //  *                   was successful.
  //  */
  // public connect(output): boolean {
  //   if (output.isInput
  //       || this.connection === output
  //       || this.node.descendants.includes(output.node)) {
  //     return false;
  //   }

  //   this.connection = output;
  //   this.connection.connect(this);
  //   return true;
  // }

  // /**
  //  * Disconnects this input from existing connection
  //  */
  // public disconnect() {
  //   if (this.connected) {
  //     const connection = this.connection;
  //     this.connection = null;
  //     connection.disconnect(this);
  //   }
  // }

  // public disconnectAll() {
  //   this.disconnect();
  // }

  // /**
  //  * Compability alias
  //  */
  // get connections() {
  //   return this.connected ? [this.connection] : [];
  // }
}
