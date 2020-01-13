import {
  START_NODE_ROW,
  START_NODE_COL,
  FINISH_NODE_ROW,
  FINISH_NODE_COL,
} from '../PathfindingVisualizer/PathfindingVisualizer';

let direction = {
  SOUTH: 1,
  EAST: 2,
};

export function recursiveDivision (grid) {
  const columns = grid[0].length;
  const rows = grid.length;
  let wallsGeneratedInOrder = [];
  generateOuterWalls (grid, wallsGeneratedInOrder);
  divide (
    grid,
    1,
    1,
    columns - 2,
    rows - 2,
    chooseOrientation (columns, rows),
    wallsGeneratedInOrder
  );
  return wallsGeneratedInOrder;
}

function divide (grid, x, y, columns, rows, orientation, stack) {
  console.log ('height: ' + rows + ' width: ' + columns);
  //base case: if width and height are 1
  if (columns < 3 || rows < 3) {
    console.log ('base case reached!');
    return;
  }

  const horizontal = orientation === 'horizontal';

  //where will walls be drawn from
  let wallX = getNewWallX (orientation, columns, x);
  let wallY = getNewWallY (orientation, rows, y);
  console.log ('wallX: ' + wallX + ' wallY: ' + wallY);

  //where will the door be?
  let doorX = wallX + (horizontal ? getRandomInt (columns) : 0);
  let doorY = wallY + (horizontal ? 0 : getRandomInt (rows));

  console.log ('doorX: ' + doorX + ' doorY: ' + doorY);

  //what direction will the wall be drawn?
  const dx = horizontal ? 1 : 0;
  const dy = horizontal ? 0 : 1;

  //determine length of wall
  const length = horizontal ? columns : rows;

  //what direction is perpendicular to the wall?
  const dir = horizontal ? direction.SOUTH : direction.EAST;

  //push new wall onto stack, unless it is the door node
  for (let i = 0; i < length; i++) {
    if (
      wallY !== doorY &&
      dir === direction.EAST &&
      !grid[wallY + 1][wallX].isDoor
    ) {
      stack.push (grid[wallY][wallX]);
    } else if (
      dir === direction.SOUTH &&
      wallX !== doorX &&
      !grid[wallY][wallX + 1].isDoor
    ) {
      stack.push (grid[wallY][wallX]);
    }
    wallX += dx;
    wallY += dy;
  }

  grid[doorY][doorX].isDoor = true;

  //recursive call for one half of the grid from divide and conquer
  let nextX = x, nextY = y;
  let nextColumns = horizontal ? columns : wallX - x;
  let nextRows = horizontal ? wallY - y : rows;
  console.log (nextX, nextY, nextColumns, nextRows);
  console.log ('recurse left');
  divide (
    grid,
    nextX,
    nextY,
    nextColumns,
    nextRows,
    chooseOrientation (nextColumns, nextRows),
    stack
  );

  //recursive call for other half of the grid from divide and conquer
  nextX = horizontal ? x : wallX + 1;
  nextY = horizontal ? wallY + 1 : y;
  nextColumns = horizontal ? columns : x + columns - wallX - 1;
  nextRows = horizontal ? y + rows - wallY - 1 : rows;
  console.log (nextX, nextY, nextColumns, nextRows);
  console.log ('recurse right');
  divide (
    grid,
    nextX,
    nextY,
    nextColumns,
    nextRows,
    chooseOrientation (nextColumns, nextRows),
    stack
  );
  console.log ('End of function call');
  return stack;
}

//function to get new x position for wall given orientation, number of columns
//in a grid and starting x position
function getNewWallX (orientation, columns, x) {
  let newX = x;
  if (orientation !== 'horizontal') {
    newX += getRandomInt (columns - 3) + 1;
  }

  return newX;
}

//function to get new y position for wall given orientation, number of rows
//in a grid and starting y position
function getNewWallY (orientation, rows, y) {
  let newY = y;
  if (orientation !== 'vertical') {
    newY += getRandomInt (rows - 3) + 1;
  }

  return newY;
}

//function to generate outer walls of grid, BEFORE recursive division starts
function generateOuterWalls (grid, stack) {
  const columns = grid[0].length;
  const rows = grid.length;

  //generate walls for first and last rows
  for (let i = 0; i < columns; i++) {
    stack.push (grid[0][i]);
    stack.push (grid[rows - 1][i]);
  }

  //generate walls for first and last column
  for (let i = 0; i < rows; i++) {
    stack.push (grid[i][0]);
    stack.push (grid[i][columns - 1]);
  }
}

function chooseOrientation (columns, rows) {
  if (columns < rows) return 'horizontal';
  else if (rows < columns) return 'vertical';
  else return Math.floor (Math.random () + 1) === 0 ? 'horizontal' : 'vertical';
}

function getRandomInt (max) {
  return Math.floor (Math.random () * Math.floor (max));
}
