

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
        this.checkCell = null;
        this.refreshGrid(this.rows, this.cols);
        this.gridElement.addEventListener("drop", this.gridDrop.bind(this));
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

    updateCellIsSolution(cell, solution, idx) {
        cell.inSolution = true;
        this.playSolution(this, solution, idx+1);
    }

    playSolution(obj, solution, idx=0){
        if (idx < solution.length) {
            let coords = solution[idx];
            let square = obj.grid[coords[0]][coords[1]];
            setTimeout(function() {obj.updateCellIsSolution(square, solution, idx)}, 200);
        }
    }

    gridDrop(ev) {
        // ev.preventDefault();
        console.log("grid drop");
        let draggedEdge = [ev.dataTransfer.getData("coordsStart"), ev.dataTransfer.getData("coordsEnd")];
        this.createEdge(ev.dataTransfer); 
    }
    
    getCellFromData(data) {
        let square;
        try {
            square = this.grid[data[0]][data[1]];
        } catch {
            console.log("oops");
            square = this.grid[0][0];
        } finally {
            return square;
        }

    }
    updateCellEvent(events, idx) {
        let curEvent = events[idx];
        let cell;
        switch (curEvent.label) {
            case "checkCell":
                this.setCheckCell(curEvent.data);
                break;
            case "solution":
                cell = this.getCellFromData(curEvent.data);
                cell.inSolution = true;
                break;
            case "deleteSolution":
                cell = this.getCellFromData(curEvent.data);
                cell.inSolution = false;
                break;
            case "setVisited":
                cell = this.getCellFromData(curEvent.data);
                if (!!cell)
                    cell.visited = true;
                break;
            case "clearVisited":
                this.clearVisited();
                break;
            default:
                break;
        }
        this.playEvents(this, events, idx+1);
    }

    playEvents(obj, events, idx=0) {
        if (idx < events.length) {
            setTimeout(function() {obj.updateCellEvent(events, idx)}, 200);
        }
    }

    clearVisited() {
        for (let row of this.grid) {
            for (let square of row) {
                square.visited = false;
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

    setCheckCell(coords) {
        if (!coords || coords[0] < 0 || coords[1] < 0) {
            return;
        }
        if (!!this.checkCell) {
            this.checkCell.Checking = false;
        } 
        let cell = this.getCellFromData(coords);
        if (!!cell) {
            this.checkCell = cell;
            this.checkCell.Checking = true;
        }
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
    this.squareElement.addEventListener("mouseover", this.highlight.bind(this));
    this.squareElement.addEventListener("dragstart", this.cellDrag.bind(this));
    this.squareElement.addEventListener("dragend", this.cellDrop.bind(this));
  }

  createEdge(coords) {
      
  }
  highlight(event) {
        // console.log(`row: ${this.row}, col: ${this.col}`);
    }
    
    cellDrag(ev) {
        console.log("cell drag");
        ev.dataTransfer.setData("coordsStart", [ev.target.row, ev.target.col]);
    }

    cellDrop(ev) {
        console.log("cell drop");
        ev.dataTransfer.setData("coordsEnd", [this.row, this.col]); 
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
    set Checking(val) {
        if (val) {
            this.squareElement.classList.add("checking");
        } else {
            this.squareElement.classList.remove("checking");
        }
    }
    set inSolution(val) {
        if (val) {
            this.squareElement.classList.add("inSolution");
        } else {
            this.squareElement.classList.remove("inSolution");
        }
    }
    set visited(val) {
        if (val) {
            this.squareElement.classList.add("visited");
        } else {
            this.squareElement.classList.remove("visited");
        }
    }
}