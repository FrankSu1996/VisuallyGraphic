export function recursiveDivision(grid) {
  let wallsGeneratedInOrder = [];
  generateOuterWalls(grid, wallsGeneratedInOrder);
  return wallsGeneratedInOrder;
}

generateOuterWalls(grid, stack) = () => {
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
};
