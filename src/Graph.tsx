import React, { Component } from 'react';
import { Table } from '@finos/perspective';
import { ServerRespond } from './DataStreamer';
import './Graph.css';

/**
 * Props declaration for <Graph />
 */
interface IProps {
  data: ServerRespond[],
}

/**
 * Perspective library adds load to HTMLElement prototype.
 * This interface acts as a wrapper for Typescript compiler.
 */
interface PerspectiveViewerElement extends HTMLElement {
  load: (table: Table) => void,
}

/**
 * React component that renders Perspective based on data
 * parsed from its parent through data property.
 */
class Graph extends Component<IProps, {}> {
  // Perspective table
  table: Table | undefined;
  elem: PerspectiveViewerElement | null = null;
  
  componentDidMount() {
    // Get element to attach the table from the DOM.
    this.elem = document.getElementsByTagName('perspective-viewer')[0] as PerspectiveViewerElement;
    const schema = {
      stock: 'string',
      top_ask_price: 'float',
      top_bid_price: 'float',
      timestamp: 'date',
    };

    if (window.perspective && window.perspective.worker()) {
      this.table = window.perspective.worker().table(schema);
    }
    if (this.table && this.elem) {
      // Load the `table` in the `<perspective-viewer>` DOM reference.

      // Add more Perspective configurations here.
      this.elem.load(this.table);
      this.elem.setAttribute('view', 'y_line');
      this.elem.setAttribute('column-pivots', '["stock"]');
      this.elem.setAttribute('row-pivots', '["timestamp"]');
      this.elem.setAttribute('columns', '["top_ask_price"]');
      this.elem.setAttribute('aggregates', `
        {"stock": "distinct count",
         "top_ask_price": "avg",
         "top_bid_price": "avg",
         "timestamp": "distinct count"
        }`);
    }
  }
  

  componentDidUpdate(prevProps: IProps) {
    // Only update the table if the data prop has changed
    if (this.props.data !== prevProps.data && this.table) {
      // As part of the task, you need to fix the way we update the data prop to
      // avoid inserting duplicated entries into the Perspective table again.
      const formattedData = this.props.data.map((el: ServerRespond) => ({
        stock: el.stock,
        top_ask_price: el.top_ask && el.top_ask.price || 0,
        top_bid_price: el.top_bid && el.top_bid.price || 0,
        timestamp: el.timestamp,
      }));
      this.table.update(formattedData);
    }
  }
  
  render() {
    return React.createElement('perspective-viewer');
  }
  
export default Graph;
