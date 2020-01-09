import React, {Component} from 'react';

import './Node.css';

export default class Node extends Component {
  render() {
    const {
      col,
      isFinish,
      isStart,
      isWall,
      is2xWall,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      row,
      isVisited,
      isLegend,
    } = this.props;
    const extraClassName = isFinish
      ? 'node-finish'
      : isStart
      ? 'node-start'
      : isWall
      ? 'node-wall'
      : is2xWall
      ? 'node-2x-wall'
      : isVisited
      ? 'node-visited'
      : '';

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        onMouseDown={this.props.isLegend ? () => onMouseDown(row, col) : null}
        onMouseEnter={this.props.isLegend ? () => onMouseEnter(row, col) : null}
        onMouseUp={this.props.isLegend ? () => onMouseUp() : null}
      ></div>
    );
  }
}
