export class CoordsMap extends Map {
  get(arr) {
    if (typeof arr === "string")
      return super.get(arr);
    return super.get(`[${arr.join(',')}]`);
  }
  has(arr) {
    if (typeof arr === "string")
      return super.has(arr);
    return super.has(`[${arr.join(',')}]`);
  }
  set(arr) {
    super.set(`[${arr.join(',')}]`, [arr[2],arr[3],arr[0],arr[1]]);
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