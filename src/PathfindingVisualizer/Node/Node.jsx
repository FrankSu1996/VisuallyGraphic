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
        onMouseDown={isLegend ? null : () => onMouseDown(row, col)}
        onMouseEnter={isLegend ? null : () => onMouseEnter(row, col)}
        onMouseUp={isLegend ? null : () => onMouseUp()}
      ></div>
    );
  }
}
