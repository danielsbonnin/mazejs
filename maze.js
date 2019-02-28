import { CoordsMap } from "./coords-map.js";

export class Maze {
  constructor(edges, nrows, ncols) {
    console.log("new maze");
    this.m = +nrows;
    this.n = +ncols;
    this.edges = edges;
    this.entrances = this.calculateEntrances();
    this.numEntrances = this.entrances.length;
    this.solution = [];
    if (this.numEntrances != 2) {
      console.log(`This maze has ${this.numEntrances} entrances. Should have 2`);
    } else {
      this.printMaze();
    }
  }
  
  calculateEntrances() {
    let endsArr = [];
    for (let i = 0; i < this.m; i++) {
      if (this.edges.has([i,0,i,-1])) {
          endsArr.push([i, 0]);
      }
      if (this.edges.has([i, this.n-1,i,this.n])) {
          endsArr.push([i, this.n-1]);
      }
    }
    for (let i = 0; i < this.n; i++) {
      if (this.edges.has([0,i,-1,i]))
        endsArr.push([0, i]);
      if (this.edges.has([this.m-1,i,this.m,i]))
        endsArr.push([this.m-1, i]);
    }
    return endsArr
  }
  
  printMaze() {
    let mazeArr = [];
    for (let i = 0; i < this.m*2+1; i++) {
        mazeArr.push([]);
      if (i%2===0) {
        for (let j = 0; j < this.n; j++) {
          if (this.edges.has([i/2-1,j,i/2,j]))
            mazeArr[i].push("   ");
          else
            mazeArr[i].push("---");
        }
      }
      else {
        for (let j = 0; j < this.n+1; j++) {
          if (this.edges.has([Math.floor(i/2),j-1,Math.floor(i/2),j]))
            mazeArr[i].push("   ");
          else
            mazeArr[i].push("|  ");
        }
      }
    }
    for (let idx = 0; idx < this.solution.length; idx++) {
        let coords = this.solution[idx];
        mazeArr[coords[0]*2+1][coords[1]] = mazeArr[coords[0]*2+1][coords[1]]
            .replace("   ", `${idx+1}`) 
            .replace("|  ", `|${idx+1}`);
    }
    console.log(mazeArr.map((row) => row.join("")).join("\n"));
  }
}