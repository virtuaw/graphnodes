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
}
