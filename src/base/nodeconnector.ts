import BaseNode from './basenode';

export default abstract class NodeConnector {
  /**
   * Indicates whether there is new data being passed through this connection.
   */
  public active: boolean = false;

  /**
   * An array containing all NodeConnectors that are connected to this one.
   */
  public connections: NodeConnector[] = [];

  /**
   * The parent Node of the connector
   */
  public node: BaseNode<any, any> = null;

  /**
   * Whether this is an input or output connection.
   */
  public connectorType: 'input' | 'output';

  /**
   * Returns true when this connector is connected to another
   * node.
   */
  get connected() {
    return this.connections.length > 0;
  }

  /**
   * Shorthand for checking connector type.
   */
  get isInput() {
    return this.connectorType === 'input';
  }

  /**
   * Shorthand for checking connector type.
   */
  get isOutput() {
    return !this.isInput;
  }

  /**
   * @param title: String for representing the connector
   * @param key: Optionally, pass a key for use in objects containing this connector.
   *             If none is passed, a lowercase version of the title is used in place.
   */
  constructor(
    public title: string, public key?: string) {
  }

  /**
   * Check whether a connector is already connected to this node.
   *
   * @param connector: The Node connector to check against.
   *
   * @returns: true if connected, false if not.
   */
  public alreadyConnected(connector: NodeConnector): boolean {
    return this.connections.includes(connector);
  }

  /**
   * Check whether a connector is the same type as this.
   *
   * @param connector: The Node connector to check against.
   *
   * @returns: true if they are the same, false otherwise
   */
  public compareType(connector: NodeConnector): boolean {
    return this.connectorType === connector.connectorType;
  }

  /**
   * Check whether a connection is valid.
   * Invalid connections are either the same connector type (e.g. output -> output)
   * or already existing connections.
   *
   * @param connector: The Node connector to check against.
   *
   * @returns: Whether the connection is valid.
   */
  public checkConnection(connector: NodeConnector): boolean {
    return !this.compareType(connector) && !this.alreadyConnected(connector);
  }

  /**
   * Connect this conector to a different one, check for pitfalls
   * like the connector types matching, the node being the same or
   * circular connections.
   * Add this node to the connecting node's connections and vice versa
   * if a connection is possible.
   *
   * This uses the addConnection method as both connectors need to be updated,
   * but just calling connect on the target would result in them calling each
   * other ad infinitum.
   *
   * @param connector: The Node Connector that's being connected.
   *
   * @returns: Whether the connection was successful
   */
  public connect(connector): boolean {
    if (!this.checkConnection(connector) || connector.checkConnection(this)) {
      return false;
    }
    this.addConnection(connector);
    connector.addConnection(this);

    return true;
  }

  /**
   * Add a connector to connections array and call the onConnect handler.
   * This is being called on successful node connections on both connectors,
   * so they should be in each other's connections array attribute.
   *
   * @param connector: The Node Connector to add.
   */
  public addConnection(connector: NodeConnector): void {
    this.onConnect(connector);
    this.connections.push(connector);
  }

  /**
   * This is called after a successful connection to another node's input,
   * and meant to be overwritten when nodeoutput is being extended.
   *
   * @param connector: The Node Input that's being connected to.
   */
  public onConnect(connector: NodeConnector) {
    return;
  }

  /**
   * Disconnect a node from this connector.
   * This uses the removeConnection method on both this connector as well
   * as the target for the same reasons as with addConnection during connection.
   * (Both connectors need to be updated)
   *
   * @param connector: The Node Connector that's being disconnected.
   */
  public disconnect(connector: NodeConnector) {
    this.removeConnection(connector);
    connector.removeConnection(this);
  }

  /**
   * Similar to disconnect, but instead of taking a
   * single target, remove all connections. and only call onDisconnect once.
   */
  public disconnectAll() {
    this.onDisconnect(this.connections);
    this.connections.map((conn) => conn.removeConnection(this));
    this.connections = [];
  }

  /**
   * Remove a node from connections, update connection status if necessary
   * and call the onDisconnect hook.
   *
   * @param connector: The Node Connector that's being removed.
   */
  public removeConnection(connector: NodeConnector): void {
    this.connections = this.connections.filter((conn) => conn !== connector);
    this.onDisconnect([connector]);
  }

  /**
   * Similar to onConnect, onDisconnect gets called after any disconnection, whether
   * this connector has initialized the disconnection or not.
   * Note that this function only gets called once even on disconnectAll, not every
   * time for each note as might be expected.
   *
   * For that reason all connections that are being disconnected are being passed
   * as array so they can be later iterated over.
   *
   * @param connections: An array of all the nodes that have been disconnected.
   */
  public onDisconnect(connections: NodeConnector[]) {
    return;
  }
}
