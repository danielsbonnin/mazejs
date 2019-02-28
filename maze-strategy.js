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
  }
  getNeighbors(node) {
      let neighborsarr = [];
      for (direction of [Dir.Left, Dir.Right, Dir.Top, Dir.Bottom]) {
          let neighbor = this.tryGetNeighbor(node, direction);
          if (!!neighbor)  // set parent of neighbor to curNode
              neighborsarr.push(neighbor);
      }
      return neighborsarr;
  }
  
  tryGetNeighbor(x, dir) {
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

    if (this.edges.has(dirNode));
        return (this.edges.get(dirNode).slice(2));
    return null;
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
    if (`${root.join(",")}` == `${end.join(",")}`) {
        return [[root]];
    }
        
    // deep copy of traversal history, for backtracking
    let newseen = new CoordsMap(seen);
    newseen.set(parent.concat(root));
    
    // Visit neighbors of current node
    let allNeighbors = self.getNeighbors(root)
    let ret = []
    for (let n in allNeighbors) {
        if (`${n.join(",")}` === `${parent.join(",")}`) {
            continue;
        }
        recursiveArr = [];
        for (let x of this.solutionRec(n, root, end, newseen)) {
          recursiveArr.push([root].concat(x));
        }
        ret.push(recursiveArr);
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