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

function divide(grid, x, y, columns, rows, orientation, stack) {}

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
