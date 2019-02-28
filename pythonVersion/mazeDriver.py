def main():
    from maze import Maze
    import sys
    nrows = ncols = 4
    if len(sys.argv) == 2:
        nrows = ncols = int(sys.argv[1])
    elif len(sys.argv) == 3:
        nrows = int(sys.argv[1])
        ncols = int(sys.argv[2])
        
    # nodes = createRandomMaze(nrows, ncols)
    edgesArr = [
    {
        (-1, 0, 0, 0): (0, 0, -1, 0),
        (0, 0, 1, 0): (1, 0, 0, 0),
        (1, 0, 2, 0): (2, 0, 1, 0),
        (2, 0, 3, 0): (3, 0, 2, 0),
        (3, 0, 3, 1): (3, 1, 3, 0),
        (3, 1, 3, 2): (3, 2, 3, 1),
        (3, 2, 3, 3): (3, 3, 3, 2),
        (3, 3, 3, 4): (3, 4, 3, 3)
    },
    {
        (3, 2, 4, 2):(4, 2, 3, 2),
        (2, 2, 3, 2): (3, 2, 2, 2),
        (2, 2, 2, 1): (2, 1, 2, 2),
        (2, 1, 2, 0): (2, 0, 2, 1),
        (2, 0, 1, 0): (1, 0, 2, 0),
        (1, 0, 0, 0): (0, 0, 1, 0),
        (0, 0, 0, 1): (0, 1, 0, 0),
        (0, 1, 0, 2): (0, 2, 0, 1),
        (0, 2, 1, 2): (1, 2, 0, 2),
        (1, 2, 2, 2): (2, 2, 1, 2),
        (2, 2, 2, 3): (2, 3, 2, 2),
        (2, 3, 2, 4): (2, 4, 2, 3)
    },
    {
        (0, 0, 0, 1): (0, 1, 0, 0),
        (0, 1, 0, 2): (0, 2, 0, 1),
        (0, 0, 1, 0): (1, 0, 0, 0),
        (1, 0, 1, 1): (1, 1, 1, 0),
        (1, 1, 1, 2): (1, 2, 1, 1),
        (0, 2, 1, 2): (1, 2, 0, 2),
        (1, 2, 2, 2): (2, 2, 1, 2),
        (2, 0, 2, 1): (2, 1, 2, 0),
        (2, 1, 2, 2): (2, 2, 2, 1),
        (2, 2, 2, 3): (2, 3, 2, 2),
        (2, 0, 3, 0): (3, 0, 2, 0)
        },
        {
        (0, 0, 0, 1): (0, 1, 0, 0),
        (0, 1, 0, 2): (0, 2, 0, 1),
        (0, 2, 0, 3): (0, 3, 0, 2),
        (0, 0, 1, 0): (1, 0, 0, 0),
        (1, 0, 2, 0): (2, 0, 1, 0),
        (2, 0, 3, 0): (3, 0, 2, 0),
        (2, 0, 2, 1): (2, 1, 2, 0),
        (2, 1, 2, 2): (2, 2, 2, 1),
        (2, 0, 3, 0): (3, 0, 2, 0),
        (2, 2, 1, 2): (1, 2, 2, 2),
        (1, 2, 0, 2): (0, 2, 1, 2),
        (1, 0, 1, 1): (1, 1, 1, 0),
        (1, 1, 1, 2): (1, 2, 1, 1)
        }
    ]
    for edges in edgesArr:
        nrows = max([x[0] + 1 for x in edges.keys()])
        ncols = max([x[1] + 1 for x in edges.keys()])
        edges.update({v: k for k, v in edges.items()})
        maze = Maze(nrows, ncols, edges)
        # maze.solution = maze.firstSolutionFoundDFS()
        # solution = maze.allSolutionsFoundDFS()
        print("allSolutionsDFSRec")
        for solution in maze.allSolutionsDFSRec():
            maze.solution = solution 
            print("Solution:{}".format(solution))
            print(maze)
            print("Has Solution: {}".format(len(maze.solution) != 0))
        print("allSolutionsFoundDFS")
        for solution in maze.allSolutionsFoundDFS():
            maze.solution = solution 
            print("Solution:{}".format(solution))
            print(maze)
            print("Has Solution: {}".format(len(maze.solution) != 0))

def createRandomMaze(y, x):
    from random import choice, getrandbits
    from maze import Maze, Node
    nodes = []
    choices = [True, False, False, False]
    return nodes
if __name__ == '__main__':
    main()

