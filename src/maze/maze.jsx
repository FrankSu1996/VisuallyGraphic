export function recursiveDivision(grid) {
  const columns = grid[0].length;
  const rows = grid.length;
  let wallsGeneratedInOrder = [];
  generateOuterWalls(grid, wallsGeneratedInOrder);
  divide(
    grid,
    0,
    0,
    columns,
    rows,
    chooseOrientation(columns, rows),
    wallsGeneratedInOrder
  );
  return wallsGeneratedInOrder;
}

function divide(grid, x, y, columns, rows, orientation, stack) {
  //base case: if width and height are 1
  if (columns < 2 || rows < 2) {
    return;
  }

  let horizontal = orientation === 'horizontal';

  //where will walls be drawn from
  let wallX = x + (horizontal ? 0 : Math.floor(Math.random(columns - 2)));
  let wallY = y + (horizontal ? Math.floor(Math.random(rows - 2)) : 0);

  //where the passage through the wall exist?
  let passageX = wallX + (horizontal ? Math.floor(Math.random(columns)) : 0);
  let passageY = wallY + (horizontal ? 0 : Math.floor(Math.random(rows)));

  //what direction will the wall be drawn?
  let directionX = horizontal ? 1 : 0;
  let directionY = horizontal ? 0 : 1;

  //how long will the wall be
  let length = horizontal ? columns : rows;

  for (let i = 0; i < length; i++) {
    stack.push(grid[wallX][wallY]);
    wallX += directionX;
    wallY += directionY;
  }

  let nextX = x;
  let nextY = y;
  let nextColumns = horizontal ? columns : wallX - x + 1;
  let nextRows = horizontal ? wallY - y + 1 : rows;

  return stack;
}

function generateOuterWalls(grid, stack) {
  const columns = grid[0].length;
  const rows = grid.length;

  //generate walls for first and last rows
  for (let i = 0; i < columns; i++) {
    stack.push(grid[0][i]);
    stack.push(grid[rows - 1][i]);
  }

  //generate walls for first and last column
  for (let i = 0; i < rows; i++) {
    stack.push(grid[i][0]);
    stack.push(grid[i][columns - 1]);
  }
}

function chooseOrientation(columns, rows) {
  if (columns < rows) return 'horizontal';
  else if (rows < columns) return 'vertical';
  else return Math.floor(Math.random() + 1) === 0 ? 'horizontal' : 'vertical';
}
