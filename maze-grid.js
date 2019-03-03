/**
 * Representation of Maze cells with html/css
 */
export class MazeGrid {
    constructor(maze, gridElement) {
        this.rows = maze.m;
        this.cols = maze.n;
        this.edges = maze.edges;
        this.grid = [];
        this.gridElement = gridElement;
        this.refreshGrid(this.rows, this.cols);
    }
    
    refreshGrid(rows, cols) {
        while (this.gridElement.firstChild) {
            this.gridElement.removeChild(this.gridElement.firstChild);
        }
        this.gridElement.style["grid-template-rows"] = `repeat(${rows}, 1fr)`;
        this.gridElement.style["grid-template-columns"] = `repeat(${cols}, 1fr)`;
        for (let i = 0; i < rows; i++) {
            this.grid.push([]);
            for (let j = 0; j < cols; j++) {
                let squareNode = new GridSquare(this.gridElement, i, j);
                this.setCellAvailableDirs(i, j, squareNode);
                this.grid[i].push(squareNode);
            }
        }
    }

    setCellAvailableDirs(rowIdx, colIdx, square) {
        if (this.edges.has([rowIdx, colIdx, rowIdx-1, colIdx]))
            square.top = true;
        if (this.edges.has([rowIdx, colIdx, rowIdx+1, colIdx]))
            square.bottom = true;
        if (this.edges.has([rowIdx, colIdx, rowIdx, colIdx-1]))
            square.left = true;
        if (this.edges.has([rowIdx, colIdx, rowIdx, colIdx+1]))
            square.right = true;
    }
}

export class GridSquare {
  constructor(gridElement, row, col) {
    this.squareElement = document.createElement("div");
    this.squareElement.className = "square";
    this.left = this.right = this.top = this.bottom = false;
    gridElement.appendChild(this.squareElement);
    this.row = row;
    this.col = col;
    this.squareElement.addEventListener("mouseover", this.highlight);
  }

    highlight(event) {
        console.log(`row: ${this.row}, col: ${this.col}`);
    }
    set left(canAccess) {
        if (canAccess) {
            this.squareElement.classList.add("left");
        } else {
            this.squareElement.classList.remove("left");
        }
    }
    set right(canAccess) {
        if (canAccess) {
            this.squareElement.classList.add("right");
        } else {
            this.squareElement.classList.remove("right");
        }
    }
    set top(canAccess) {
        if (canAccess) {
            this.squareElement.classList.add("top");
        } else {
            this.squareElement.classList.remove("top");
        }
    }
    set bottom(canAccess) {
        if (canAccess) {
            this.squareElement.classList.add("bottom");
        } else {
            this.squareElement.classList.remove("bottom");
        }
    }
}