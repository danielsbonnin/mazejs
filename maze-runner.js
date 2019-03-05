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
    this.events = [];
    let gridElement = document.querySelector("#mazeGrid");
    let strategy = new RecursiveStrategy(this.edges);
    strategy.addlistener(this);
    this.maze = new Maze(edges, rows, cols, strategy);
    this.mazeGrid = new MazeGrid(this.maze, gridElement);
    let solution = this.maze.findSolutions();
    for (let cell of solution) {
      this.events.push(new MazeEvent("solution", cell));
    }
    for (let cell of solution) {
      this.events.push(new MazeEvent("deleteSolution", cell));
    }
    this.mazeGrid.playEvents(this.mazeGrid, this.events);
    // this.mazeGrid.playSolution(this.mazeGrid, solution);
  }

  mazeEvent(label, data) {
    this.events.push(new MazeEvent(label, data));
  }
}

export class MazeEvent {
  constructor(label, data) {
    this.label = label;
    this.data = data;
  }
}