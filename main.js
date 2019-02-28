import { CoordsMap } from "./coords-map.js";
import { MazeRunner } from "./maze-runner.js";
import { sampleMazes } from "./sample-mazes.js";

document.querySelector("#startbtn")
  .addEventListener("click", initMazeFromTextInput);
  
document.querySelector("#sampleMazeStart")
  .addEventListener("click", initSampleMaze);
 
function initMazeFromTextInput() {
    let edgesInput = document.getElementById("edgesInput");
    let algoType =  document.getElementById("algorithmSelect");
    let decoded = parseMaze(edgesInput.value);
    let edgesMap = decoded[0];
    let nRows = decoded[1];
    let nCols = decoded[2];
    let validEdges = decoded[3];
    if (!validEdges) {
        console.log("invalid edges");
        return;
    }
    let mazeRunner = new MazeRunner(edgesMap, nRows, nCols, algoType.selected);
}

function initSampleMaze() {
    let mazeSize = document.querySelector("#sampleMazeSize").value;
    let mazeArr = sampleMazes[mazeSize][Math.floor(Math.random()*sampleMazes[mazeSize].length)];
    let edgesMap = CoordsMap.fromEdgesArr(mazeArr);
    let mazeRunner = new MazeRunner(edgesMap, mazeSize, mazeSize, "recursive");
}

function parseMaze(edgesString) {
  let all = JSON.parse(edgesString);
  let nrows = all[0][0];
  let ncols = all[0][1];
  let edgesArr = all.slice(1, all.length);
  let edgesMap = CoordsMap.fromEdgesArr(edgesArr);
  
  let isValidEdges = (nrows > 0) && (ncols > 0) && edgesArr.length > 1;
  return [edgesMap, nrows, ncols, isValidEdges];
}