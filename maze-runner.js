import { Maze } from "./maze.js";
import { MazeGrid } from "./maze-grid.js";

export class MazeRunner {
  constructor(edges, rows, cols, algo) {
    this.currentAlgorithm = algo;
    this.edges = edges;
    this.nrows = rows;
    this.ncols = cols;
    this.maze = new Maze(edges, rows, cols);
    this.mazeGrid = new MazeGrid(rows, cols);
  }
}