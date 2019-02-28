export class MazeGrid {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.grid = [];
        this.gridElement = document.getElementById("mazeGrid");
        this.refreshGrid();
    }
    
    refreshGrid() {
        while (this.gridElement.firstChild) {
            this.gridElement.removeChild(this.gridElement.firstChild);
        }
        this.gridElement.style["grid-template-rows"] = `repeat(${this.rows}, 1fr)`;
        this.gridElement.style["grid-template-columns"] = `repeat(${this.cols}, 1fr)`;
        for (let i = 0; i < this.rows; i++) {
            this.grid.push([]);
            for (let j = 0; j < this.cols; j++) {
                let squareNode = new GridSquare(this.gridElement, i, j);
                this.grid[i].push(squareNode);
            }
        }
        this.grid[1][1].squareElement.className = "square bottom";
    }
}

export class GridSquare {
  constructor(gridElement, row, col) {
    this.squareElement = document.createElement("div");
    this.squareElement.className = "square";
    gridElement.appendChild(this.squareElement);
  }
}