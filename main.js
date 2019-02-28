import { CoordsMap } from "./coords-map.js";
import { MazeRunner } from "./maze-runner.js";
import { sampleMazes } from "./sample-mazes.js";

document.querySelector("#startbtn")
  .addEventListener("click", initMazeFromTextInput);
  
document.querySelector("#sampleMazeStart")
  .addEventListener("click", initSampleMaze);

// show sample maze on load
window.onload = initSampleMaze;

// Coordinates UI/BL interactions
var mazeRunner;

function initMazeFromTextInput() {
    let edgesInput = document.getElementById("edgesInput");
    let algoType =  document.getElementById("algorithmSelect");
    let decoded = parseJSONMaze(edgesInput.value);
    let edgesMap = decoded[0];
    let nRows = decoded[1];
    let nCols = decoded[2];
    let validEdges = decoded[3];
    if (!validEdges) {
        console.log("invalid edges");
        return;
    }
    mazeRunner = new MazeRunner(edgesMap, nRows, nCols, algoType.selected);
}

/**
 * Convert JSON to Maze data
 * @param {*} edgesString [[m,n],[[],[],...]]
 * @returns [4] edgesMap, nrows, ncols, isValidEdges
 */
function parseJSONMaze(edgesString) {
  let all;
  try {
    all = JSON.parse(edgesString);
  } catch {
    console.log("invalid JSON maze input");
    return [null, 0, 0, false];
  }
  let nrows = all[0][0];
  let ncols = all[0][1];
  let edgesArr = all.slice(1, all.length);

  // parse array of maze edges into es6 Map
  let edgesMap = CoordsMap.fromEdgesArr(edgesArr);
  
  // Maze has exactly 2 entrances
  let isValidEdges = (nrows > 0) && (ncols > 0) && edgesArr.length > 1;

  return [edgesMap, nrows, ncols, isValidEdges];
}

/**
 * Initialize a random selection from predefined mazes, by size
 */
function initSampleMaze() {
    let mazeSize = document.querySelector("#sampleMazeSize").value;
    let mazeArr = sampleMazes[mazeSize][Math.floor(Math.random()*sampleMazes[mazeSize].length)];
    let edgesMap = CoordsMap.fromEdgesArr(mazeArr);
    mazeRunner = new MazeRunner(edgesMap, mazeSize, mazeSize, "recursive");
}