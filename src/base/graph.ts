import BaseNode from './basenode';

export default class Graph {
  public title = 'Graph';
  public nodes: Array<BaseNode<any, any>> = [];
  public inputNodes: Array<BaseNode<any, any>> = [];
  public outputNodes: Array<BaseNode<any, any>> = [];

  /**
   * Get connections as connection from outputs to input.
   *
   * @returns: Array of connections.
   */
  get connections() {
    return this.nodes.reduce((connections, node) => {
      return connections.concat(node.output.connections);
    }, []);
  }

  /**
   * Get all inputs from input nodes
   *
   * @returns: Array of NodeInput instances.
   */
  get inputs() {
    return this.inputNodes.reduce((inputs, node) => inputs.concat(node.inputs), []);
  }

  /**
   * Get all outputs from output nodes
   *
   * @returns: Array of NodeOutput instances.
   */
  get outputs() {
    return this.outputNodes.map((node) => node.output);
  }

  /**
   * Add Node to graph
   *
   * @param node: Node to add.
   */
  public addNode(node: BaseNode<any, any>) {
    this.nodes.push(node);
  }

  /**
   * Promote Node to input node
   *
   * @param node: Node to promote
   */
  public promoteInput(node: BaseNode<any, any>) {
    this.inputNodes.push(node);
  }

  /**
   * Demote Input node
   *
   * @param node: Node to demote
   */
  public demoteInput(node: BaseNode<any, any>) {
    this.inputNodes = this.inputNodes.filter((n) => n !== node);
  }

  /**
   * Add Node as input node
   *
   * @param node: Input Node to add.
   */
  public addInput(node: BaseNode<any, any>) {
    this.nodes.push(node);
    this.promoteInput(node);
  }

  /**
   * Promote Node to output node
   *
   * @param node: Node to promote
   */
  public promoteOutput(node: BaseNode<any, any>) {
    this.outputNodes.push(node);
  }

  /**
   * Demote Output node
   *
   * @param node: Node to demote
   */
  public demoteOutput(node: BaseNode<any, any>) {
    this.outputNodes = this.outputNodes.filter((n) => n !== node);
  }

  /**
   * Add Node as output node
   *
   * @param node: Output Node to add.
   */
  public addOutput(node: BaseNode<any, any>) {
    this.nodes.push(node);
    this.promoteOutput(node);
  }

  /**
   * Remove node from graph.
   *
   * @param node: Node to remove.
   */
  public removeNode(node: BaseNode<any, any>) {
    // Disconnect inputs and output
    node.inputs.map((input) => input.disconnect());
    node.output.disconnectAll();

    // Demote Node from input/output if necessary
    this.demoteInput(node);
    this.demoteOutput(node);

    // Filter node from nodes
    this.nodes = this.nodes.filter((n) => n !== node);
  }
}
