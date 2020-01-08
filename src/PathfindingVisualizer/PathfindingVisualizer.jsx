import React, {Component} from 'react';
import Node from './Node/Node';
import {dijkstra, getNodesInShortestPathOrder} from '../algorithms/dijkstra';
import {unweightedAlgorithm} from '../algorithms/depthFirstSearch';
import Menu from '../Menu/Menu';

import './PathfindingVisualizer.css';

//constants to define start and finish node coordinates
let START_NODE_ROW = 10;
let START_NODE_COL = 15;
let FINISH_NODE_ROW = 10;
let FINISH_NODE_COL = 30;

//enumeration to define algorithm animation (in ms)
export const algorithmSpeed = {
  SLOW: 200,
  MEDIUM: 75,
  FAST: 20,
};

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      startNodeSelected: false,
      finishNodeSelected: false,
      algorithmInProgress: false,
      algorithmSelected: null,
      algorithmSpeed: algorithmSpeed.FAST,
    };
  }

  componentDidMount = () => {
    const grid = getInitialGrid();
    this.setState({grid});
  };

  //handles either placing walls, or setting start and finish nodes
  handleMouseDown = (row, col) => {
    let newGrid = [];
    if (this.state.grid[row][col].isStart) {
      this.setState({startNodeSelected: true});
      newGrid = this.state.grid;
    } else if (this.state.grid[row][col].isFinish) {
      this.setState({finishNodeSelected: true});
      newGrid = this.state.grid;
    } else {
      newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    }
    this.setState({grid: newGrid, mouseIsPressed: true});
  };

  handleMouseEnter = (row, col) => {
    if (!this.state.mouseIsPressed) return;

    let newGrid = [];
    //selecting new start node
    if (this.state.startNodeSelected) {
      newGrid = updateGridWithNewStartNode(this.state.grid, row, col);
    } else if (this.state.finishNodeSelected) {
      newGrid = updateGridWithNewFinishNode(this.state.grid, row, col);
    } else {
      //placing walls
      newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    }
    this.setState({grid: newGrid});
  };

  handleMouseUp = () => {
    if (this.state.startNodeSelected) {
      this.setState({startNodeSelected: false});
    } else if (this.state.finishNodeSelected) {
      this.setState({finishNodeSelected: false});
    }
    this.setState({mouseIsPressed: false});
  };

  animateAlgorithm = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    this.setState({algorithmInProgress: true});
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 20 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        if (!visitedNodesInOrder.isWall) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-visited';
        }
        if (node.isStart) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-visited node-start';
        }
      }, this.state.algorithmSpeed * i);
    }
  };

  animateShortestPath = nodesInShortestPathOrder => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];

        const previousNode = node.previousNode;

        //get direction of previous node
        if (previousNode !== null) {
          if (previousNode.row > node.row) {
            document.getElementById(`node-${node.row}-${node.col}`).className =
              'node node-shortest-path up';
            document.getElementById(
              `node-${node.row + 1}-${node.col}`
            ).className = 'node node-shortest-path';
          } else if (previousNode.row < node.row) {
            document.getElementById(`node-${node.row}-${node.col}`).className =
              'node node-shortest-path down';
            document.getElementById(
              `node-${node.row - 1}-${node.col}`
            ).className = 'node node-shortest-path';
          } else if (previousNode.col > node.col) {
            document.getElementById(`node-${node.row}-${node.col}`).className =
              'node node-shortest-path left';
            document.getElementById(
              `node-${node.row}-${node.col + 1}`
            ).className = 'node node-shortest-path';
          } else {
            document.getElementById(`node-${node.row}-${node.col}`).className =
              'node node-shortest-path right';
            document.getElementById(
              `node-${node.row}-${node.col - 1}`
            ).className = 'node node-shortest-path';
          }
        }
      }, 50 * i);
    }
    this.setState({algorithmInProgress: false});
  };

  visualizeAlgorithmHandler = algorithm => {
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    let visitedNodesInOrder = [];

    switch (algorithm) {
      case 'djikstra':
        visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        break;
      case 'depthFirstSearch':
        visitedNodesInOrder = unweightedAlgorithm(
          grid,
          startNode,
          finishNode,
          'depthFirstSearch'
        );
        break;
      case 'breadthFirstSearch':
        visitedNodesInOrder = unweightedAlgorithm(
          grid,
          startNode,
          finishNode,
          'breadthFirstSearch'
        );
        break;
      default:
        break;
    }
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  resetGridHandler = () => {
    console.log('fdsa');
    const newGrid = getInitialGrid();
    for (let row = 0; row < 20; row++) {
      for (let col = 0; col < 50; col++) {
        if (row === START_NODE_ROW && col === START_NODE_COL) {
          document.getElementById(`node-${row}-${col}`).className =
            'node node-start';
        } else if (row === FINISH_NODE_ROW && col === FINISH_NODE_COL) {
          document.getElementById(`node-${row}-${col}`).className =
            'node node-finish';
        } else {
          document.getElementById(`node-${row}-${col}`).className = 'node';
        }
      }
    }
    this.setState({grid: newGrid});
  };

  setAlgorithmHandler = algorithm => {
    this.setState({algorithmSelected: algorithm});
  };

  setSpeedHandler = speed => {
    this.setState({algorithmSpeed: speed});
  };

  render() {
    const {grid, mouseIsPressed} = this.state;

    return (
      <React.Fragment>
        <Menu
          setAlgorithm={this.setAlgorithmHandler}
          visualizeAlgorithm={this.visualizeAlgorithmHandler}
          resetGrid={this.resetGridHandler}
          algorithmInProgress={this.state.algorithmInProgress}
          algorithmSelected={this.state.algorithmSelected}
          setSpeed={this.setSpeedHandler}
          algorithmSpeed={this.state.algorithmSpeed}
        ></Menu>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {row, col, isFinish, isStart, isWall} = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
    animationDirection: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const updateGridWithNewStartNode = (grid, row, col) => {
  const prevStartRow = START_NODE_ROW;
  const prevStartCol = START_NODE_COL;
  const newGrid = grid.slice();

  //set old start node to normal node
  const oldStartNode = newGrid[prevStartRow][prevStartCol];
  oldStartNode.isStart = false;

  //set new start node
  const node = newGrid[row][col];
  const newStartNode = {
    ...node,
    isStart: true,
  };
  newGrid[row][col] = newStartNode;
  START_NODE_ROW = row;
  START_NODE_COL = col;
  return newGrid;
};

const updateGridWithNewFinishNode = (grid, row, col) => {
  const prevFinishRow = FINISH_NODE_ROW;
  const prevFinishCol = FINISH_NODE_COL;
  const newGrid = grid.slice();

  //set old finish node to normal node
  const oldStartNode = newGrid[prevFinishRow][prevFinishCol];
  oldStartNode.isFinish = false;

  //set new finish node
  const node = newGrid[row][col];
  const newFinishNode = {
    ...node,
    isFinish: true,
  };
  newGrid[row][col] = newFinishNode;
  FINISH_NODE_ROW = row;
  FINISH_NODE_COL = col;
  return newGrid;
};
