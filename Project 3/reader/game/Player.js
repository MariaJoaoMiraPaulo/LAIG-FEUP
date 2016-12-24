class Player {
  constructor(player,graph,scene) {
    this.player = player;
    this.scene = scene;
    this.reader = this.scene.reader;
    this.graph = graph;
    this.score = 0;

    this.pawn1 = new Pawn(this.scene, this.reader, this.player);
    this.pawn2 = new Pawn(this.scene, this.reader, this.player);

    this.numberWalls = 7;
    this.walls = new Array(this.numberWalls-1);

    for(var i=0;i<this.numberWalls;i++)
      this.walls[i]=new Wall(this.scene, this.reader, this.player);


    switch (player) {
      case 1:
      this.startPositionPawn1=this.graph.components["board"].childrens[0].startPos11;
      this.startPositionPawn2=this.graph.components["board"].childrens[0].startPos12;
      this.startPositionWall1 = [-2,0.3,3];
      break;
      case 2:
      this.startPositionPawn1=this.graph.components["board"].childrens[0].startPos21;
      this.startPositionPawn2=this.graph.components["board"].childrens[0].startPos22;
      this.startPositionWall1 = [16,0.3,3];
      break;
    }

  }

  getNumbernumberWalls(){
    return this.numberWalls();
  }

  setNumbernumberWalls(numbernumberWalls){
    this.numberWalls = numbernumberWalls;
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
    this.pawn1.setPawnXCoord(this.startPositionPawn1[0]);
    this.pawn1.setPawnYCoord(this.startPositionPawn1[1]);
    this.pawn1.setPawnZCoord(this.startPositionPawn1[2]);

    this.pawn2.setPawnXCoord(this.startPositionPawn2[0]);
    this.pawn2.setPawnYCoord(this.startPositionPawn2[1]);
    this.pawn2.setPawnZCoord(this.startPositionPawn2[2]);
  }

  moveWallsToStartPosition(){
    for(var i=0; i< this.numberWalls;i++){
      this.walls[i].setWallXCoord(this.startPositionWall1[0]);
      this.walls[i].setWallYCoord(this.startPositionWall1[1]);
      this.walls[i].setWallZCoord(this.startPositionWall1[2]+i*0.5);
    }

  }

  displayWalls(){
    for(var i=0; i< this.numberWalls;i++)
      this.walls[i].display();
  }

  displayPawns(){
    this.pawn1.display();
    this.pawn2.display();
  }
}
