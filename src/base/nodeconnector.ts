import BaseNode from './basenode';

/**
 * Node Connector
 *
 * Abstract class for both inputs and outputs.
 */

export default abstract class NodeConnector {
  /**
   * The connector's title.
   */
  public title: string;
  public active: boolean = false;

  /**
   * The parent Node of the connector
   */
  public node: BaseNode<any, any>;

  /**
   * Returns true when this connector is connected to another
   * node.
   */
  public connected: boolean;

  public connectorType: string;

  get isInput() {
    return this.connectorType === 'input';
  }

  get isOutput() {
    return !this.isInput;
  }

  /**
   * This is called after a successful connection to another node's input,
   * and meant to be overwritten when nodeoutput is being extended.
   * @param input: The Node Input that's being connected to.
   */
  public onConnect(connection: NodeConnector): any {
    return;
  }

  /**
   * Similarly, onDisconnect gets called after a disconnection.
   * Note that this function only gets called once, whether one node has been disconnected,
   * or all. This is why onDisconnect gets passed an array containing all the nodes that
   * have been disconnected.
   *
   * @param connections: An array of all the nodes that have been disconnected.
   */
  public onDisconnect(connections: NodeConnector[]): any {
    return;
  }
}
