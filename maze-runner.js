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
    this.strategy = new RecursiveStrategy(this.edges);
    let listener = this.mazeEvent;  // function (label, data) { console.log(`${label} emitted with data: ${data}`);}
    
    this.maze = new Maze(edges, rows, cols, this.strategy);
    this.mazeGrid = new MazeGrid(this.maze, gridElement);
    this.strategy.addlistener(this);
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