export class CoordsMap extends Map {
  get(arr) {
    if (typeof arr === "string")
      return super.get(arr);
    return super.get(`[${arr.join(',')}]`);
  }
  has(arr) {
    if (!arr || arr.length === 0) {
      return false;
    }
    if (typeof arr === "string")
      return super.has(arr);
    return super.has(`[${arr.join(',')}]`);
  }
  set(arrkey, arrval) {
    if (typeof arrkey === "string") {
      super.set(arrkey, arrval);
    } else {
      super.set(`[${arrkey.join(',')}]`, arrval);
    }
  }
  
  static fromEdgesArr(edgesArr) {
    // add reverse of all edges in case some were missed
    let cpy = edgesArr.slice().map((edge) => [edge[2], edge[3], edge[0], edge[1]]);
    let withReversesArr = edgesArr.concat(cpy);
    let edgesMap = new CoordsMap();
    withReversesArr.map((edge) => { 
        let rev = [edge[2], edge[3], edge[0], edge[1]];
        edgesMap.set(edge, rev);
    });
    return edgesMap;
  }
}