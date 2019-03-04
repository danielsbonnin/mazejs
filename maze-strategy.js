import { CoordsMap } from "./coords-map.js";

var Dir = {
  Left: 0,
  Right: 1,
  Top: 2,
  Bottom: 3
};

export class MazeStrategy {
  constructor(edges) {
    this.edges = edges;
    this.listeners = [];
  }
  addlistener(obj, listener) {
    this.listeners.push(obj);
  }

  emit(label, data) {
    for (let l of this.listeners) {
      l.mazeEvent(label, data);
    }
    
  }

  checkCell(row, col) {
    await sleep(500);
    this.emit("checkCell", {"row": row, "col": col});
    
  }

  setVisited(row, col) {

  }
  setCurrentCell(row, col) {

  }
  getNeighbors(node) {
      this.checkCell(node[0], node[1]);
      let neighborsarr = [];
      for (let direction of [Dir.Left, Dir.Right, Dir.Top, Dir.Bottom]) {
          let neighbor = this.tryGetNeighbor(node, direction);
          if (!!neighbor)  // set parent of neighbor to curNode
              neighborsarr.push(neighbor);
      }
      return neighborsarr;
  }
  
  tryGetNeighbor(x, dir) {
    let dirNode = [];
    switch (dir) {
        case Dir.Left: 
          dirNode = [x[0], x[1], x[0], x[1]-1];
          break;
        case Dir.Right:
          dirNode = [x[0], x[1], x[0], x[1]+1];
          break;
        case Dir.Top:
          dirNode = [x[0], x[1], x[0]-1, x[1]];
          break;
        case Dir.Bottom:
          dirNode = [x[0], x[1], x[0]+1, x[1]];
          break;
        default:
          console.log(`No such direction as ${dir}`);
    }

    if (this.edges.has(dirNode))
      return this.edges.get(dirNode).slice(0,2);
    else {
      return null;
    }
  }

  findSolutions() {
    throw new Error("find solutions not implemented");
  }
}

export class RecursiveStrategy extends MazeStrategy {
  findSolutions(st, end) {
    return this.solutionRec(st, null, end, new CoordsMap());
  }
  
  solutionRec(root, parent, end, seen) {
    this.edgeAlreadyTraversed = (seen.has(root) || seen.has(parent));
    if (!root || this.edgeAlreadyTraversed) {
        return [];
    }
    
    // base case: found exit
    if (`${root.join(",")}` === `${end.join(",")}`) {
        return [[root]];
    }
        
    // deep copy of traversal history, for backtracking
    let newseen = new CoordsMap(seen);
    if (!parent)
      parent = [null];
    newseen.set(parent, root);
    
    // Visit neighbors of current node
    let allNeighbors = this.getNeighbors(root);
    let ret = [];
    for (let n of allNeighbors) {
        if (`${n.join(",")}` === `${parent.join(",")}`) {
            continue;
        }
        for (let x of this.solutionRec(n, root, end, newseen)) {
            ret.push([root].concat(x));
        }
    }
    return ret;
  }
  
  allSolutionsDFSRec() {
      let ends = this.maze.getEnds();
      if (ends.length != 2) {
        return [];
      }
      seen = new CoordsMap();
      return self.solutionRec(ends[0], None, ends[1], seen)
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}