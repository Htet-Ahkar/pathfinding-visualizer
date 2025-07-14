import { MAX_COLS, MAX_ROWS } from "./constants";
import { GridType, TileType } from "./types";

//* I want to use delta
export const getUntraversedNeighbors = (grid: GridType, tile: TileType) => {
  const { row, col } = tile;
  const neighbors: TileType[] = [];

  // add top tile
  if (row > 0) {
    neighbors.push(grid[row - 1][col]);
  }

  // add down tile
  if (row < MAX_ROWS - 1) {
    neighbors.push(grid[row + 1][col]);
  }

  // add left tile
  if (col > 0) {
    neighbors.push(grid[row][col - 1]);
  }

  // add right tile
  if (col < MAX_COLS - 1) {
    neighbors.push(grid[row][col + 1]);
  }
  return neighbors.filter((neighbor) => !neighbor.isTraversed);
};
