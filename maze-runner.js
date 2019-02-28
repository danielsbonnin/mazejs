import { Maze } from "./maze.js";
import { MazeGrid } from "./maze-grid.js";
import { RecursiveStrategy } from "./maze-strategy.js";

/**
 * 
 */
export class MazeRunner {
  constructor(edges, rows, cols, algo) {
    this.currentAlgorithm = algo;
    this.edges = edges;
    this.nrows = rows;
    this.ncols = cols;
    // let strategy = new RecursiveStrategy(this.edges);
    let maze = new Maze(edges, rows, cols);
    
    let gridElement = document.querySelector("#mazeGrid");
    this.mazeGrid = new MazeGrid(maze, gridElement);
  }
}