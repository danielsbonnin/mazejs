from enum import Enum
class Dir(Enum):
    Same = 1
    Left = 2
    Right = 3
    Top = 4
    Bottom = 5
    
class Maze:
    def __init__(self, m, n, edges):
        self.m = m
        self.n = n
        self.edges = edges
        self.solution = []
    
    def __repr__(self):
        ret = [
            ["   " if (i/2-1, j, i/2, j) in self.edges else "---" for j in range(self.n) ] if i%2 == 0 else
            ["   " if (i//2, j-1, i//2, j) in self.edges else "|  " for j in range(self.n+1) ]
             for i in range(self.m*2+1)]
 
        for idx, coords in enumerate(self.solution):
            ret[coords[0]*2+1][coords[1]] = ret[coords[0]*2+1][coords[1]] \
                .replace("   ", "{:3}".format(idx+1)) \
                .replace("|  ", "|{:2}".format(idx+1))
        return "\n".join(["".join(x) for x in ret])
    
    @staticmethod
    def reversePathSingle(endNode, childparentdict):
        solution = [endNode]
        parent = childparentdict[endNode]
        while parent:
            solution.append(parent)
            parent = childparentdict[parent]
        return solution
    
    @staticmethod
    def trimToCommonAncestor(a, b, childparentdict):
        aAncestors = { }
        while a:
            t = childparentdict[a]
            aAncestors[a] = t
            print(childparentdict)
            a = t
        while b not in aAncestors:
            t = childparentdict[b]
            del childparentdict[b]
            b = t
        return b
    
    def getNeighbors(self, node):
        neighborsarr = []
        for direction in [Dir.Left, Dir.Right, Dir.Top, Dir.Bottom]:
            neighbor = self.tryGetNeighbor(node, direction)
            if neighbor:  # set parent of neighbor to curNode
                neighborsarr.append(neighbor)
        return neighborsarr
    
    def tryGetNeighbor(self, node, dir):
        dirNode = {
            Dir.Left: lambda x:   (x[0], x[1], x[0], x[1]-1),
            Dir.Right: lambda x:  (x[0], x[1], x[0], x[1]+1),
            Dir.Top: lambda x:    (x[0], x[1], x[0]-1, x[1]),
            Dir.Bottom: lambda x: (x[0], x[1], x[0]+1, x[1])
        }[dir](node)

        if dirNode in self.edges:
            return (self.edges[dirNode][0], self.edges[dirNode][1])
        return None
    
    def firstSolutionFoundDFS(self):
        ''' 
        Return first map solution found, if exists else [].
        Ignores multiple solutions.
        '''
        ends = Maze.getEnds(self)  # [(row, col), (row, col)]
        if len(ends) != 2:         # Invalid maze: Not 2 entrances
            return []

        # map to preserve path order
        childparentdict = {ends[0]: None}
        
        # Stack of discovered nodes
        toCheck = [ends[0]]
        while toCheck:
            curNode = toCheck.pop()
            
            # Solution found
            if curNode == ends[1]:
                # Calculate path by backtracking through single parent links
                return Maze.reversePathSingle(curNode, childparentdict)
            
            # Visit neighbors of current node
            allNeighbors = self.getNeighbors(curNode)
            for n in allNeighbors:
                if n not in childparentdict:      # unvisited node:
                    childparentdict[n] = curNode  # 1. assign parent
                    toCheck.append(n)             # 2. append to stack
        return []
    
    def solutionRec(self, root, parent, end, seen):
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
    
    def calculateSolution(self, node, childparentdict):
        ret = []
        while node:
            ret.append(node)
            tempnode = childparentdict[node][-1]
            del childparentdict[node][-1]
            node = tempnode
        return ret
            
    def allSolutionsFoundDFS(self):
        ''' 
        Return all map solutions found else [].
        '''
        ends = Maze.getEnds(self)  # [(row, col), (row, col)]
        if len(ends) != 2:         # Invalid maze: Not 2 entrances
            return []

        # map to preserve path order
        childparentdict = {ends[0]: [None]}
        
        # Stack of unvisited nodes
        toCheck = [ends[0]]
        solutions = []
        while toCheck:
            curNode = toCheck.pop()
            
            if curNode == ends[1]:
                solutions.append(self.calculateSolution(curNode, childparentdict))
                
            # Visit neighbors of current node
            allNeighbors = self.getNeighbors(curNode)
            for n in allNeighbors:
                if n not in childparentdict:      # unvisited node:
                    childparentdict[n] = [curNode]
                    toCheck.append(n)   
                else:  # this edge has already been traversed
                    if curNode in childparentdict[n] or n in childparentdict[curNode]:
                        continue
                    else: # unique edge, visited node
                        childparentdict[n].append(curNode)
                        toCheck.append(n)
        return solutions

    def getEnds(maze):
        endsArr = []
        for i in range(maze.m):
            if (i, 0, i, -1) in maze.edges:
                endsArr.append((i, 0))
            if (i, maze.n, i, maze.n-1) in maze.edges:
                endsArr.append((i, maze.n-1))
        for i in range(maze.n):
            if (0, i, -1, i) in maze.edges:
                endsArr.append((0, i))
            if (maze.m, i, maze.m-1, i) in maze.edges:
                endsArr.append((maze.m-1, i))
        return endsArr
    