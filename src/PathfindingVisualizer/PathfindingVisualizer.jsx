import React, {Component} from 'react';
import Node from './Node/Node';
import {dijkstra, getNodesInShortestPathOrder} from '../algorithms/dijkstra';
import {unweightedAlgorithm} from '../algorithms/depthFirstSearch';
import Menu from '../Menu/Menu';
import {recursiveDivision} from '../maze/maze';
import {Container, Row, Col} from 'react-bootstrap';

import './PathfindingVisualizer.css';

//constants to define start and finish node coordinates
export let START_NODE_ROW = 10;
export let START_NODE_COL = 15;
export let FINISH_NODE_ROW = 10;
export let FINISH_NODE_COL = 30;
let NUM_ROWS = 10;
let NUM_COLUMNS = 10;

//enumeration to define algorithm animation (in ms)
export const algorithmSpeed = {
  SLOW: 200,
  MEDIUM: 75,
  FAST: 20,
};

export default class PathfindingVisualizer extends Component {
  constructor () {
    super ();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      startNodeSelected: false,
      finishNodeSelected: false,
      algorithmInProgress: false,
      algorithmSelected: 'djikstra',
      isAlgorithmSelectedWeighted: true,
      algorithmSpeed: algorithmSpeed.FAST,
      wallTypeSelected: 'normal',
    };
  }

  componentDidMount = () => {
    const grid = getInitialGrid ();
    this.setState ({grid});
  };

  //handles either placing walls, or setting start and finish nodes
  handleMouseDown = (row, col) => {
    let newGrid = [];
    if (this.state.grid[row][col].isStart) {
      this.setState ({startNodeSelected: true});
      newGrid = this.state.grid;
    } else if (this.state.grid[row][col].isFinish) {
      this.setState ({finishNodeSelected: true});
      newGrid = this.state.grid;
    } else {
      newGrid = getNewGridWithWallToggled (
        this.state.grid,
        row,
        col,
        this.state.wallTypeSelected
      );
    }
    this.setState ({grid: newGrid, mouseIsPressed: true});
  };

  handleMouseEnter = (row, col) => {
    if (!this.state.mouseIsPressed) return;

    let newGrid = [];
    //selecting new start node
    if (this.state.startNodeSelected) {
      newGrid = updateGridWithNewStartNode (this.state.grid, row, col);
    } else if (this.state.finishNodeSelected) {
      newGrid = updateGridWithNewFinishNode (this.state.grid, row, col);
    } else {
      //placing walls
      newGrid = getNewGridWithWallToggled (
        this.state.grid,
        row,
        col,
        this.state.wallTypeSelected
      );
    }
    this.setState ({grid: newGrid});
  };

  handleMouseUp = () => {
    if (this.state.startNodeSelected) {
      this.setState ({startNodeSelected: false});
    } else if (this.state.finishNodeSelected) {
      this.setState ({finishNodeSelected: false});
    }
    this.setState ({mouseIsPressed: false});
  };

  animateAlgorithm = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    this.setState ({algorithmInProgress: true});
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout (() => {
          this.animateShortestPath (nodesInShortestPathOrder);
        }, this.state.algorithmSpeed * i);
        return;
      }
      setTimeout (() => {
        const node = visitedNodesInOrder[i];
        if (!visitedNodesInOrder.isWall) {
          document.getElementById (`node-${node.row}-${node.col}`).className =
            'node node-visited';
        }
        if (node.isStart) {
          document.getElementById (`node-${node.row}-${node.col}`).className =
            'node node-visited node-start';
        } else if (node.isFinish) {
          document.getElementById (`node-${node.row}-${node.col}`).className =
            'node node-visited node-finish';
        } else if (node.is2xWall) {
          document.getElementById (`node-${node.row}-${node.col}`).className =
            'node node-visited node-2x-wall';
        }
      }, this.state.algorithmSpeed * i);
    }
  };

  animateShortestPath = nodesInShortestPathOrder => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout (() => {
        const node = nodesInShortestPathOrder[i];

        const previousNode = node.previousNode;

        let extraClass = '';
        //get direction of previous node
        if (previousNode !== null) {
          if (previousNode.is2xWall === true) extraClass = ' node-2x-wall';
          if (previousNode.row > node.row) {
            document.getElementById (`node-${node.row}-${node.col}`).className =
              'node node-shortest-path up';
            document.getElementById (
              `node-${node.row + 1}-${node.col}`
            ).className =
              'node node-shortest-path' + extraClass;
          } else if (previousNode.row < node.row) {
            document.getElementById (`node-${node.row}-${node.col}`).className =
              'node node-shortest-path down';
            document.getElementById (
              `node-${node.row - 1}-${node.col}`
            ).className =
              'node node-shortest-path' + extraClass;
          } else if (previousNode.col > node.col) {
            document.getElementById (`node-${node.row}-${node.col}`).className =
              'node node-shortest-path left';
            document.getElementById (
              `node-${node.row}-${node.col + 1}`
            ).className =
              'node node-shortest-path' + extraClass;
          } else {
            document.getElementById (`node-${node.row}-${node.col}`).className =
              'node node-shortest-path right';
            document.getElementById (
              `node-${node.row}-${node.col - 1}`
            ).className =
              'node node-shortest-path' + extraClass;
          }
        }
      }, 50 * i);
    }
    this.setState ({algorithmInProgress: false});
  };

  visualizeAlgorithmHandler = algorithm => {
    const {grid} = this.state;
    console.log ('columns: ', grid[0].length);
    console.log ('rows: ', grid.length);
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    let visitedNodesInOrder = [];

    switch (algorithm) {
      case 'djikstra':
        visitedNodesInOrder = dijkstra (grid, startNode, finishNode);
        break;
      case 'depthFirstSearch':
        visitedNodesInOrder = unweightedAlgorithm (
          grid,
          startNode,
          finishNode,
          'depthFirstSearch'
        );
        break;
      case 'breadthFirstSearch':
        visitedNodesInOrder = unweightedAlgorithm (
          grid,
          startNode,
          finishNode,
          'breadthFirstSearch'
        );
        break;
      default:
        break;
    }
    const nodesInShortestPathOrder = getNodesInShortestPathOrder (finishNode);
    this.animateAlgorithm (visitedNodesInOrder, nodesInShortestPathOrder);
  };

  resetGridHandler = () => {
    console.log ('fdsa');
    const newGrid = getInitialGrid ();
    for (let row = 0; row < NUM_ROWS; row++) {
      for (let col = 0; col < NUM_COLUMNS; col++) {
        if (row === START_NODE_ROW && col === START_NODE_COL) {
          document.getElementById (`node-${row}-${col}`).className =
            'node node-start';
        } else if (row === FINISH_NODE_ROW && col === FINISH_NODE_COL) {
          document.getElementById (`node-${row}-${col}`).className =
            'node node-finish';
        } else {
          document.getElementById (`node-${row}-${col}`).className = 'node';
        }
      }
    }
    this.setState ({grid: newGrid});
  };

  setAlgorithmHandler = algorithm => {
    this.resetGridHandler ();
    if (algorithm === 'djikstra') {
      this.setState ({
        algorithmSelected: algorithm,
        isAlgorithmSelectedWeighted: true,
      });
    } else {
      this.setState ({
        algorithmSelected: algorithm,
        isAlgorithmSelectedWeighted: false,
        wallTypeSelected: 'normal',
      });
    }
  };

  setSpeedHandler = speed => {
    this.setState ({algorithmSpeed: speed});
  };

  setWallHandler = wall => {
    this.setState ({wallTypeSelected: wall});
  };

  generateMazeHandler = () => {
    const generatedWallsInOrder = recursiveDivision (this.state.grid);
    const newGrid = [...this.state.grid];
    for (let i = 0; i < generatedWallsInOrder.length; i++) {
      setTimeout (() => {
        const node = generatedWallsInOrder[i];
        newGrid[node.row][node.col].isWall = true;
        document.getElementById (`node-${node.row}-${node.col}`).className =
          'node node-wall';
      }, 15 * i);
    }
    this.setState ({grid: newGrid});
  };

  render () {
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
          setWall={this.setWallHandler}
          algorithmWeighted={this.state.isAlgorithmSelectedWeighted}
          generateMaze={this.generateMazeHandler}
        />
        <div className="grid">
          {grid.map ((row, rowIdx) => {
            return (
              <div key={rowIdx} className="row">
                {row.map ((node, nodeIdx) => {
                  const {row, col, isFinish, isStart, isWall, is2xWall} = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      is2xWall={is2xWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) =>
                        this.handleMouseDown (row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter (row, col)}
                      onMouseUp={() => this.handleMouseUp ()}
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
  for (let row = 0; row < NUM_ROWS; row++) {
    const currentRow = [];
    for (let col = 0; col < NUM_COLUMNS; col++) {
      currentRow.push (createNode (col, row));
    }
    grid.push (currentRow);
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
    is2xWall: false,
    previousNode: null,
    animationDirection: null,
    isLegend: false,
  };
};

const getNewGridWithWallToggled = (grid, row, col, wallType) => {
  const newGrid = grid.slice ();
  const node = newGrid[row][col];
  let newNode = null;
  if (wallType === 'normal') {
    newNode = {
      ...node,
      isWall: !node.isWall,
      is2xWall: false,
    };
  } else if (wallType === '2x') {
    console.log ('FDSAFDSAF');
    newNode = {
      ...node,
      isWall: false,
      is2xWall: !node.is2xWall,
    };
  }
  newGrid[row][col] = newNode;
  return newGrid;
};

const updateGridWithNewStartNode = (grid, row, col) => {
  const prevStartRow = START_NODE_ROW;
  const prevStartCol = START_NODE_COL;
  const newGrid = grid.slice ();

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
  const newGrid = grid.slice ();

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
