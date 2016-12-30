Board.distanceBetweenCubes = 1.4;
Board.distanceBetweenFloor= 1.4;
Board.currentWalls = [];

function Board(scene, reader, dimX , dimZ) {
  CGFobject.call(this, scene);
  this.scene = scene;
  this.reader = reader;
  this.dimX = dimX;
  this.doubleDimX = dimX*2;
  this.dimZ = dimZ;
  this.doubleDimZ = dimZ*2;

  this.distanceBetweenCubes = 1.4;
  this.distanceBetweenFloor= 1.4;
  this.cubeSize = 1;
  this.floorSize = 0.3;
  this.floorHeigth = -0.1;

  this.selectableCells = false;
  this.selectableWallPosition = false;

  this.normal = new CGFappearance(this.scene);
  this.normal.setAmbient(1.0,1,1,1);
  this.normal.setDiffuse(1.0,1,1,1);
  this.normal.setSpecular(1.0,1,1,1);
  this.normal.setShininess(0);
  this.normal.loadTexture("img/board.jpg");

  this.highlight = new CGFappearance(this.scene);
  this.highlight.setAmbient(1.0,1,1,1);
  this.highlight.setDiffuse(1.0,1,1,1);
  this.highlight.setSpecular(1.0,1,1,1);
  this.highlight.setShininess(0);
  this.highlight.loadTexture("img/boardHighLight.jpg");


  this.boardElements = new Array(this.doubleDimZ-2);

  var xTab = this.dimX * this.cubeSize  + (this.dimX-1)*this.floorSize;
  var zTab = this.dimZ * this.cubeSize  + (this.dimZ-1)*this.floorSize;

  this.currentPawnOnGamePosition;

  this.currentWallPositionX;
  this.currentWallPositionZ;

  this.createBoard();
};

Board.prototype = Object.create(CGFobject.prototype);
Board.prototype.constructor = Board;

Board.prototype.createBoard = function () {


  for(var i = 0; i < this.doubleDimZ-1; i++){
    this.boardElements[i] = new Array(this.doubleDimX-1);
    for(var j=0;j< this.doubleDimX-1;j++){
      if(i % 2 == 0){
        this.boardElements[i][j] = new Cube(this.scene,this.reader,i,j);
      }
      else{
        if(j%2 == 0){
          this.boardElements[i][j] = new Cube(this.scene,this.reader,i,j);
        }
        else this.boardElements[i][j] = " ";
      }
    }
  }
}

Board.prototype.display = function () {


  this.scene.clearPickRegistration();

  if(typeof this.scene.game != "undefined"){
    if(this.scene.game.currentState==this.scene.game.state.SELECTING_PAWN_NEXT_POSITION){
      this.selectableCells = true;
    }
    else this.selectableCells = false;

  if(this.scene.game.currentState==this.scene.game.state.SELECTING_FIRST_WALL_POSITION || this.scene.game.currentState==this.scene.game.state.SELECTING_SECOND_WALL_POSITION){
      this.selectableWallPosition = true;
    }
    else this.selectableWallPosition = false;
  }

  var index = 1;
  for(var z=0;z<this.dimZ;z++){
    for(var x=0;x< this.dimX;x++){

      this.scene.pushMatrix();

      this.scene.translate(this.distanceBetweenCubes*x+0.5,0,this.distanceBetweenCubes*z+0.5);
      this.scene.scale(1, 0.3, 1);
      if(this.selectableCells && this.possibleMove([z*2,x*2])){
        this.scene.registerForPick(index, this.boardElements[z*2][x*2]);
        index++;
        this.highlight.apply();
        this.boardElements[z*2][x*2].display();
      }
      else{
        this.scene.clearPickRegistration();
        this.normal.apply();
        this.boardElements[z*2][x*2].display();
      }


      this.scene.popMatrix();

    }
  }

  for(var z=0;z<this.dimZ -1 ;z++){
    for(var x=0;x< this.dimX ;x++){
      this.scene.pushMatrix();

      this.scene.translate(this.distanceBetweenFloor*x+0.5,0,this.distanceBetweenFloor*z+1.2);
      this.scene.scale(1, 0.2, 0.3);
      if(this.selectableWallPosition && this.possibleWall([z*2+1,x*2]) && this.secondWallPossibility([z*2+1,x*2])){
        this.scene.registerForPick(index, this.boardElements[z*2+1][x*2]);
        index++;
        this.highlight.apply();
        this.boardElements[z*2+1][x*2].display();
      }
      else{
        this.scene.clearPickRegistration();
        this.normal.apply();
        this.boardElements[z*2+1][x*2].display();
      }


      this.scene.popMatrix();
    }
  }

  for(var z=0;z<this.dimZ ;z++){
    for(var x=0;x< this.dimX -1 ;x++){
      this.scene.pushMatrix();

      this.scene.translate(this.distanceBetweenFloor*x+1.2,0,this.distanceBetweenFloor*z+0.5);
      this.scene.scale(0.3, 0.2, 1);
      if(this.selectableWallPosition && this.possibleWall([z*2,x*2+1]) && this.secondWallPossibility([z*2,x*2+1])){
        this.scene.registerForPick(index, this.boardElements[z*2][x*2+1]);
        index++;
        this.highlight.apply();
        this.boardElements[z*2][x*2+1].display();
      }
      else{
        this.scene.clearPickRegistration();
        this.normal.apply();
        this.boardElements[z*2][x*2+1].display();
      }


      this.scene.popMatrix();
    }
  }

  this.scene.clearPickRegistration();

}

Board.prototype.validatePosition = function(arrayPos){
  this.currentPawnOnGamePosition = arrayPos.slice(0);
  console.log(this.currentPawnOnGamePosition);
}

Board.prototype.possibleMove = function(arrayPos){

  //array pos z,x

  var r1 = [this.currentPawnOnGamePosition[0],this.currentPawnOnGamePosition[1]+ 2];
  var wr1 = [this.currentPawnOnGamePosition[0],this.currentPawnOnGamePosition[1]+ 1];

  var r2 = [this.currentPawnOnGamePosition[0],this.currentPawnOnGamePosition[1]+ 4];
  var wr2 = [this.currentPawnOnGamePosition[0],this.currentPawnOnGamePosition[1]+3];

  var l1 = [this.currentPawnOnGamePosition[0],this.currentPawnOnGamePosition[1]-2];
  var wl1 = [this.currentPawnOnGamePosition[0],this.currentPawnOnGamePosition[1]-1];

  var l2 = [this.currentPawnOnGamePosition[0],this.currentPawnOnGamePosition[1]-4];
  var wl2 = [this.currentPawnOnGamePosition[0],this.currentPawnOnGamePosition[1]-3];

  var t1 = [this.currentPawnOnGamePosition[0]-2,this.currentPawnOnGamePosition[1]];
  var wt1 = [this.currentPawnOnGamePosition[0]-1,this.currentPawnOnGamePosition[1]];

  var t2 = [this.currentPawnOnGamePosition[0]-4,this.currentPawnOnGamePosition[1]];
  var wt2 = [this.currentPawnOnGamePosition[0]-3,this.currentPawnOnGamePosition[1]];

  var b1 = [this.currentPawnOnGamePosition[0]+2,this.currentPawnOnGamePosition[1]];
  var wb1 = [this.currentPawnOnGamePosition[0]+1,this.currentPawnOnGamePosition[1]];

  var b2 = [this.currentPawnOnGamePosition[0]+4,this.currentPawnOnGamePosition[1]];
  var wb2 = [this.currentPawnOnGamePosition[0]+3,this.currentPawnOnGamePosition[1]];

  var dtr = [this.currentPawnOnGamePosition[0]-2,this.currentPawnOnGamePosition[1]+2];
  var wdtr1 = [this.currentPawnOnGamePosition[0]-2,this.currentPawnOnGamePosition[1]+1];
  var wdtr2 = [this.currentPawnOnGamePosition[0]-1,this.currentPawnOnGamePosition[1]+2];

  var dtl = [this.currentPawnOnGamePosition[0]-2,this.currentPawnOnGamePosition[1]-2];
  var wdtl1 = [this.currentPawnOnGamePosition[0]-2,this.currentPawnOnGamePosition[1]-1];
  var wdtl2 = [this.currentPawnOnGamePosition[0]-1,this.currentPawnOnGamePosition[1]-2];

  var dbr = [this.currentPawnOnGamePosition[0]+2,this.currentPawnOnGamePosition[1]+2];
  var wdbr1 = [this.currentPawnOnGamePosition[0]+2,this.currentPawnOnGamePosition[1]+1];
  var wdbr2 = [this.currentPawnOnGamePosition[0]+1,this.currentPawnOnGamePosition[1]+2];

  var dbl = [this.currentPawnOnGamePosition[0]+2,this.currentPawnOnGamePosition[1]-2];
  var wdbl1 = [this.currentPawnOnGamePosition[0]+2,this.currentPawnOnGamePosition[1]-1];
  var wdbl2 = [this.currentPawnOnGamePosition[0]+1,this.currentPawnOnGamePosition[1]-2];

  if((this.arraysAreIdentical(arrayPos,r1) && !this.hasAwallBetween(wr1) && !this.pawnPosition(r1)) ||
  (this.arraysAreIdentical(arrayPos,r2) && !this.hasAwallBetween(wr2) && !this.hasAwallBetween(wr1) && !this.pawnPosition(r2) && !this.pawnPosition(r1)) ||
  (this.arraysAreIdentical(arrayPos,l1) && !this.hasAwallBetween(wl1) && !this.pawnPosition(l1))||
  (this.arraysAreIdentical(arrayPos,l2) && !this.hasAwallBetween(wl2) && !this.hasAwallBetween(wl1) && !this.pawnPosition(l2) && !this.pawnPosition(l1)) ||
  (this.arraysAreIdentical(arrayPos,t1) && !this.hasAwallBetween(wt1) && !this.pawnPosition(t1)) ||
  (this.arraysAreIdentical(arrayPos,t2) && !this.hasAwallBetween(wt2) && !this.hasAwallBetween(wt1) && !this.pawnPosition(t2) && !this.pawnPosition(t1)) ||
  (this.arraysAreIdentical(arrayPos,b1) && !this.hasAwallBetween(wb1) && !this.pawnPosition(b1)) ||
  (this.arraysAreIdentical(arrayPos,b2) && !this.hasAwallBetween(wb2) && !this.hasAwallBetween(wb1) && !this.pawnPosition(b2) && !this.pawnPosition(b1)) ||
  (this.arraysAreIdentical(arrayPos,dtr) && !this.hasAwallBetween(wdtr1) && !this.hasAwallBetween(wdtr2) && !this.hasAwallBetween(wr1) && !this.hasAwallBetween(wt1) && !this.pawnPosition(dtr)) ||
  (this.arraysAreIdentical(arrayPos,dtl) && !this.hasAwallBetween(wdtl1) && !this.hasAwallBetween(wdtl2) && !this.hasAwallBetween(wl1) && !this.hasAwallBetween(wt1) && !this.pawnPosition(dtl))||
  (this.arraysAreIdentical(arrayPos,dbr) && !this.hasAwallBetween(wdbr1) && !this.hasAwallBetween(wdbr2) && !this.hasAwallBetween(wr1) && !this.hasAwallBetween(wb1) && !this.pawnPosition(dbr))||
  (this.arraysAreIdentical(arrayPos,dbl) && !this.hasAwallBetween(wdbl1) && !this.hasAwallBetween(wdbl2) && !this.hasAwallBetween(wb1) && !this.hasAwallBetween(wl1) && !this.pawnPosition(dbl)))
  {

    return true;
  }

  return false;
}

Board.prototype.possibleWall = function(arrayPos){

  for(var i=0;i<this.scene.game.currentWalls.length;i++){
    if(this.arraysAreIdentical(this.scene.game.currentWalls[i],arrayPos)){
      return false;
    }
  }
  return true;
}

Board.prototype.pawnPosition = function(arrayPos){

  for(var i=0;i<this.scene.game.pawns.length;i++){
    if(this.arraysAreIdentical(this.scene.game.pawns[i],arrayPos)){
      return true;
    }
  }

  return false;
}

Board.prototype.hasAwallBetween = function(arrayPos){

  for(var i=0;i<this.scene.game.currentWalls.length;i++){
    if(this.arraysAreIdentical(this.scene.game.currentWalls[i],arrayPos)){
      return true;
    }
  }

  return false;
}


Board.prototype.getPawnDiretion = function (x,z) {

  var arrayPos = [z,x];

  var r1 = [this.currentPawnOnGamePosition[0],this.currentPawnOnGamePosition[1]+2];
  if(this.arraysAreIdentical(arrayPos,r1)){
    var direction="r1";
    return direction;
  }

  var r2 = [this.currentPawnOnGamePosition[0],this.currentPawnOnGamePosition[1]+4];
  if(this.arraysAreIdentical(arrayPos,r2)){
    var direction="r2";
    return direction;
  }

  var l1 = [this.currentPawnOnGamePosition[0],this.currentPawnOnGamePosition[1]-2];
  if(this.arraysAreIdentical(arrayPos,l1)){
    var direction="l1";
    return direction;
  }

  var l2 = [this.currentPawnOnGamePosition[0],this.currentPawnOnGamePosition[1]-4];
  if(this.arraysAreIdentical(arrayPos,l2)){
    var direction="l2";
    return direction;
  }

  var t1 = [this.currentPawnOnGamePosition[0]-2,this.currentPawnOnGamePosition[1]];
  if(this.arraysAreIdentical(arrayPos,t1)){
    var direction="t1";
    return direction;
  }

  var t2 = [this.currentPawnOnGamePosition[0]-4,this.currentPawnOnGamePosition[1]];
  if(this.arraysAreIdentical(arrayPos,t2)){
    var direction="t2";
    return direction;
  }

  var b1 = [this.currentPawnOnGamePosition[0]+2,this.currentPawnOnGamePosition[1]];
  if(this.arraysAreIdentical(arrayPos,b1)){
    var direction="b1";
    return direction;
  }

  var b2 = [this.currentPawnOnGamePosition[0]+4,this.currentPawnOnGamePosition[1]];
  if(this.arraysAreIdentical(arrayPos,b2)){
    var direction="b2";
    return direction;
  }

  var dtr = [this.currentPawnOnGamePosition[0]-2,this.currentPawnOnGamePosition[1]+2];
  if(this.arraysAreIdentical(arrayPos,dtr)){
    var direction="dtr";
    return direction;
  }

  var dtl = [this.currentPawnOnGamePosition[0]-2,this.currentPawnOnGamePosition[1]-2];
  if(this.arraysAreIdentical(arrayPos,dtl)){
    var direction="dtl";
    return direction;
  }

  var dbr = [this.currentPawnOnGamePosition[0]+2,this.currentPawnOnGamePosition[1]+2];
  if(this.arraysAreIdentical(arrayPos,dbr)){
    var direction="dbr";
    return direction;
  }

  var dbl = [this.currentPawnOnGamePosition[0]+2,this.currentPawnOnGamePosition[1]-2];
  if(this.arraysAreIdentical(arrayPos,dbl)){
    var direction="dbl";
    return direction;
  }
  return false;
}

Board.prototype.getWallOrientation = function (firstWallz,firstWallx,secondWallz,secondWallx) {

  var orientation;

  if(this.arraysAreIdentical([firstWallz,firstWallx],[secondWallz,secondWallx+2])){
    orientation='h';
    return orientation;
  }

  if(this.arraysAreIdentical([firstWallz,firstWallx+2],[secondWallz,secondWallx])){
    orientation='h';
    return orientation;
  }

  if(this.arraysAreIdentical([firstWallz,firstWallx-2],[secondWallz,secondWallx])){
    orientation='h';
    return orientation;
  }

  if(this.arraysAreIdentical([firstWallz,firstWallx],[secondWallz,secondWallx-2])){
    orientation='h';
    return orientation;
  }

  if(this.arraysAreIdentical([firstWallz-2,firstWallx],[secondWallz,secondWallx])){
    orientation='v';
    return orientation;
  }

  if(this.arraysAreIdentical([firstWallz,firstWallx],[secondWallz-2,secondWallx])){
    orientation='v';
    return orientation;
  }

  if(this.arraysAreIdentical([firstWallz,firstWallx],[secondWallz+2,secondWallx])){
    orientation='v';
    return orientation;
  }

  if(this.arraysAreIdentical([firstWallz+2,firstWallx],[secondWallz,secondWallx])){
    orientation='v';
    return orientation;
  }

  return false;

}


Board.prototype.secondWallPossibility = function (pos) {

  if(this.scene.game.currentState == this.scene.game.state.SELECTING_SECOND_WALL_POSITION){
    if(this.currentWallPositionZ % 2 == 0){
      if(this.arraysAreIdentical([this.currentWallPositionZ+2,this.currentWallPositionX],pos))
      return true;
      else if(this.arraysAreIdentical([this.currentWallPositionZ-2,this.currentWallPositionX],pos))
      return true;
      else return false;
    }
    else {
      // if(this.crossWallH())
      // return false;
      if(this.arraysAreIdentical([this.currentWallPositionZ,this.currentWallPositionX+2],pos))
      return true;
      else if(this.arraysAreIdentical([this.currentWallPositionZ,this.currentWallPositionX-2],pos))
      return true;
      else return false;
    }
  }
  else return true;
}

Board.prototype.crossWallH = function(){

  // if(!this.possibleWall([this.currentWallPositionZ-1,this.currentWallPositionX+1])){
  // }
  // else return false;
  // if(!this.possibleWall([this.currentWallPositionZ+1,this.currentWallPositionX+1]))
  // {
  //   return true;
  // }
  //
  // if(!this.possibleWall([this.currentWallPositionZ-1,this.currentWallPositionX-1])){
  //   console.log(1);
  // }
  // else return false;
  // if(!this.possibleWall([this.currentWallPositionZ+1,this.currentWallPositionX-1])){
  //       console.log(2);
  //   return true;
  // }
  //   console.log(3);
  // return false;
}

Board.prototype.convertPositionOnBoard = function (pos) {
  return pos/2*Board.distanceBetweenCubes+0.5;
}

Board.prototype.arraysAreIdentical = function(arr1, arr2){
  if (arr1.length !== arr2.length) return false;
  for (var i = 0, len = arr1.length; i < len; i++){
    if (arr1[i] !== arr2[i]){
      return false;
    }
  }
  return true;
}


Board.prototype.updateTexCoords = function (s, t) {

}
