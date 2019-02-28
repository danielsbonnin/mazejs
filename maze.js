import { CoordsMap } from "./coords-map.js";

/**
 * A collection of openings between adjacent cells in m x n grid
 *  and related helper methods
 */
export class Maze {
  constructor(edges, nrows, ncols) {
    this.m = +nrows;
    this.n = +ncols;
    this.edges = edges;  // ES6 Map of directed paths between adjacent cells
    this.entrances = this.calculateEntrances();  // array of entrances
    this.numEntrances = this.entrances.length;

    // validate entrances
    if (this.numEntrances != 2) {
      console.log(`This maze has ${this.numEntrances} entrances. Should have 2`);
    } else {
      this.solution = []; // strategy.findSolutions(this.entrances[0], this.entrances[1]);
      this.printMaze();
    }
  }
  
  /**
   * get all grid squares connected outside the grid (ie: maze entrances)
   */
  calculateEntrances() {
    let endsArr = [];
    // check top and bottom for edge extending outside bound
    for (let i = 0; i < this.m; i++) {
      if (this.edges.has([i,0,i,-1])) {
          endsArr.push([i, 0]);
      }
      if (this.edges.has([i, this.n-1,i,this.n])) {
          endsArr.push([i, this.n-1]);
      }
    }

    // check left and right sides
    for (let i = 0; i < this.n; i++) {
      if (this.edges.has([0,i,-1,i]))
        endsArr.push([0, i]);
      if (this.edges.has([this.m-1,i,this.m,i]))
        endsArr.push([this.m-1, i]);
    }
    return endsArr
  }
  
  /**
   * A text representation of the maze printed to console
   */
  printMaze() {
    let mazeArr = [];
    // every other row is a up/down or l/r, using even odd to toggle
    for (let i = 0; i < this.m*2+1; i++) {
        mazeArr.push([]);
      if (i%2===0) {  // evens are up/down
        for (let j = 0; j < this.n; j++) {
          if (this.edges.has([i/2-1,j,i/2,j]))
            mazeArr[i].push("   ");
          else
            mazeArr[i].push("---");
        }
      }
      else {  // odds are l/r
        for (let j = 0; j < this.n+1; j++) {
          // using Math.floor for int division
          if (this.edges.has([Math.floor(i/2),j-1,Math.floor(i/2),j]))
            mazeArr[i].push("   ");
          else
            mazeArr[i].push("|  ");
        }
      }
    }

    // add solution steps, if solution exists
    for (let idx = 0; idx < this.solution.length; idx++) {
        let coords = this.solution[idx];
        mazeArr[coords[0]*2+1][coords[1]] = mazeArr[coords[0]*2+1][coords[1]]
            .replace("   ", `${idx+1}`) 
            .replace("|  ", `|${idx+1}`);
    }
    console.log(mazeArr.map((row) => row.join("")).join("\n"));
  }
}