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
  getNeighbors(self, node) {
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
          case Dir.Top
            dirNode = [x[0], x[1], x[0]-1, x[1]];
            break;
          case Dir.Bottom:
            dirNode = [x[0], x[1], x[0]+1, x[1]];
            break;
          default:
            console.log(`No such direction as ${dir}`);
      }

    if this.edges.has(`[${''.join(dirNode)}]`]);
        return (this.edges[`[${''.join(dirNode.slice(2))}]`])
    return Null;
  }
}
export class RecursiveStrategy extends MazeStrategy {
  findSolutions(st, end, edges) {
    solution = solutionRec(st, Null, end, new Map());
  }
  
  solutionRec(root, parent, end, seen) {
    edgeAlreadyTraversed = (root, parent) in seen or (parent, root) in seen
    if not root or edgeAlreadyTraversed :
        return []
    
    # base case: found exit
    if root == end:
        return [[root]]
        
    # deep copy of traversal history, for backtracking
    newseen = seen.copy()
    newseen[(parent, root)] = True
    
    # Visit neighbors of current node
    allNeighbors = self.getNeighbors(root)
    ret = []
    for n in allNeighbors:
        if n == parent:
            continue
        ret += [[root] + x for x in self.solutionRec(n, root, end, newseen)]
    return ret

  def allSolutionsDFSRec(self):
      ends = Maze.getEnds(self)
      if len(ends) != 2:
          return []
      seen = {}
      return self.solutionRec(ends[0], None, ends[1], seen)
}