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
    let gridElement = document.querySelector("#mazeGrid");
    let strategy = new RecursiveStrategy(this.edges);
    this.maze = new Maze(edges, rows, cols, strategy);
    this.mazeGrid = new MazeGrid(this.maze, gridElement);
    strategy.addlistener(this);
    this.maze.findSolutions();
  }

  mazeEvent(label, data) {
    switch (label) {
      case "checkCell":
        this.mazeGrid.setCheckCell(data);
        break;
    }
  }
}