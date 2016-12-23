class Player {
  constructor(player,graph) {
    this.player = player;
    this.graph = graph;
    this.score = 0;
    this.walls = 9;


    switch (player) {
      case 1:
      this.pawn1 = "p11";  //id do componente com a peça 1 do player 1
      this.pawn2 = "p12";  //id do componente com a peça 2 do player 1
      this.startPositionPawn1=this.graph.components["board"].childrens[0].startPos11;
      this.startPositionPawn2=this.graph.components["board"].childrens[0].startPos12;
      break;
      case 2:
      this.pawn1 = "p21"; //id do componente com a peça 1 do player 2
      this.pawn2 = "p22"; //id do componente com a peça 2 do player 2
      this.startPositionPawn1=this.graph.components["board"].childrens[0].startPos21;
      this.startPositionPawn2=this.graph.components["board"].childrens[0].startPos22;
      break;
    }

  //  console.log(this.startPositionPawn1 +" e "+this.startPositionPawn2);
  }

  getNumberWalls(){
    return this.walls();
  }

  setNumberWalls(numberWalls){
    this.walls = numberWalls;
  }

  getScore(){
    return this.score;
  }

  setScore(score){
    this.score = score;
  }

  getPawn1Id(){
    return pawn1;
  }

  getPawn2Id(){
    return pawn2;
  }

  movePawnToStartPosition(){
    this.graph.components[this.pawn1].transformationMatrix=this.graph.getTransformationMatrix([["translate",this.startPositionPawn1[0],this.startPositionPawn1[1],this.startPositionPawn1[2]]]);
    this.graph.components[this.pawn2].transformationMatrix=this.graph.getTransformationMatrix([["translate",this.startPositionPawn2[0],this.startPositionPawn2[1],this.startPositionPawn2[2]]]);
  }

}
