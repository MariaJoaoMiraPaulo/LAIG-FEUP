Board.distanceBetweenCubes = 1.4;
Board.distanceBetweenFloor= 1.4;

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

  this.boardElements = new Array(this.doubleDimZ-2);

  this.StartPos11Circle = new StartPos(this.scene,this.reader,1);
  this.StartPos12Circle = new StartPos(this.scene,this.reader,1);
  this.StartPos21Circle = new StartPos(this.scene,this.reader,2);
  this.StartPos22Circle = new StartPos(this.scene,this.reader,2);

  var xTab = this.dimX * this.cubeSize  + (this.dimX-1)*this.floorSize;
  var zTab = this.dimZ * this.cubeSize  + (this.dimZ-1)*this.floorSize;

  var x = this.convertPositionOnBoard(4);
  var x1 = this.convertPositionOnBoard(14);

  var z = this.convertPositionOnBoard(4);
  var z1 = this.convertPositionOnBoard(12);

  var y = 1.3;

  this.startPos11=[x,y,z];
  this.startPos12=[x1,y,z];
  this.startPos21=[x,y,z1];
  this.startPos22=[x1,y,z1];

  this.currentPawnOnGamePosition;

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

  console.log("Board display");
  this.scene.clearPickRegistration();

  if(typeof this.scene.game != "undefined"){
      if(this.scene.game.currentState==this.scene.game.state.SELECTING_CELL  || this.scene.game.currentState==this.scene.game.state.SELECTING_PAWN_NEXT_POSITION_PLAYER1 || this.scene.game.currentState==this.scene.game.state.SELECTING_PAWN_NEXT_POSITION_PLAYER2 ){
        this.selectableCells = true;
      }
      else this.selectableCells = false;

      if(this.scene.game.currentState==this.scene.game.state.SELECTING_WALL_PLAYER2 || this.scene.game.currentState==this.scene.game.state.SELECTING_WALL_PLAYER1 ){
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
      if(this.selectableCells && this.possibleMove([x*2,z*2])){
          this.scene.registerForPick(index, this.boardElements[z*2][x*2]);
          index++;
          this.boardElements[z*2][x*2].display();
      }
      else{
        this.scene.clearPickRegistration();
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
      if(this.selectableWallPosition){
        this.scene.registerForPick(index, this.boardElements[z*2+1][x*2]);
        index++;
        this.boardElements[z*2+1][x*2].display();
      }
      else{
        this.scene.clearPickRegistration();
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
      if(this.selectableWallPosition){
        this.scene.registerForPick(index, this.boardElements[z*2][x*2+1]);
        index++;
        this.boardElements[z*2][x*2+1].display();
      }
      else{
        this.scene.clearPickRegistration();
        this.boardElements[z*2][x*2+1].display();
      }


      this.scene.popMatrix();
    }
  }

    this.scene.clearPickRegistration();

    this.scene.pushMatrix();
    this.scene.translate(this.startPos11[0],0.35,this.startPos11[2]);
    this.StartPos11Circle.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(this.startPos12[0],0.35,this.startPos12[2]);

    this.StartPos11Circle.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(this.startPos21[0],0.35,this.startPos21[2]);
    this.StartPos21Circle.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(this.startPos22[0],0.35,this.startPos22[2]);
    this.StartPos22Circle.display();
    this.scene.popMatrix();

}

Board.prototype.validatePosition = function(arrayPos){
  this.currentPawnOnGamePosition = arrayPos.slice(0);
  console.log(this.currentPawnOnGamePosition);
}

Board.prototype.possibleMove = function(arrayPos){

  //array pos z,x

  console.log(this.currentPawnOnGamePosition);
  console.log("entrei");

  var r1 = [this.currentPawnOnGamePosition[0],this.currentPawnOnGamePosition[1]+ 2];
  var r2 = [this.currentPawnOnGamePosition[0],this.currentPawnOnGamePosition[1]+ 4];

  var l1 = [this.currentPawnOnGamePosition[0],this.currentPawnOnGamePosition[1]-2];
  var l2 = [this.currentPawnOnGamePosition[0],this.currentPawnOnGamePosition[1]-4];

  var t1 = [this.currentPawnOnGamePosition[0]-2,this.currentPawnOnGamePosition[1]];
  var t2 = [this.currentPawnOnGamePosition[0]-4,this.currentPawnOnGamePosition[1]];

  var b1 = [this.currentPawnOnGamePosition[0]+2,this.currentPawnOnGamePosition[1]];
  var b2 = [this.currentPawnOnGamePosition[0]+4,this.currentPawnOnGamePosition[1]];

  var dtr = [this.currentPawnOnGamePosition[0]+2,this.currentPawnOnGamePosition[1]-2];

  var dtl = [this.currentPawnOnGamePosition[0]-2,this.currentPawnOnGamePosition[1]-2];

  var dbr = [this.currentPawnOnGamePosition[0]+2,this.currentPawnOnGamePosition[1]+2];

  var dbl = [this.currentPawnOnGamePosition[0]-2,this.currentPawnOnGamePosition[1]+2];

  if(this.arraysAreIdentical(arrayPos,r1)  ||  this.arraysAreIdentical(arrayPos,r2) ||  this.arraysAreIdentical(arrayPos,l1) || this.arraysAreIdentical(arrayPos,l2) ||
      this.arraysAreIdentical(arrayPos,t1) ||  this.arraysAreIdentical(arrayPos,t2) ||  this.arraysAreIdentical(arrayPos,b1) || this.arraysAreIdentical(arrayPos,b2) ||
      this.arraysAreIdentical(arrayPos,dtr)|| this.arraysAreIdentical(arrayPos,dtl) || this.arraysAreIdentical(arrayPos,dbr) || this.arraysAreIdentical(arrayPos,dbl))
  {
    return true;
  }

  return false;
}

Board.prototype.getPawnDiretion = function (x,z) {
  console.log("entrei");
  console.log(this.currentPawnOnGamePosition); //x z
  var arrayPos = [x,z];
  console.log(arrayPos);

  var r1 = [this.currentPawnOnGamePosition[0]+2,this.currentPawnOnGamePosition[1]];
  if(this.arraysAreIdentical(arrayPos,r1)){
    var direction="r1";
    return direction;
  }

  var r2 = [this.currentPawnOnGamePosition[0]+4,this.currentPawnOnGamePosition[1]];
  if(this.arraysAreIdentical(arrayPos,r2)){
    var direction="r2";
    return direction;
  }

  var l1 = [this.currentPawnOnGamePosition[0]-2,this.currentPawnOnGamePosition[1]];
  if(this.arraysAreIdentical(arrayPos,l1)){
    var direction="l1";
    return direction;
  }

  var l2 = [this.currentPawnOnGamePosition[0]-4,this.currentPawnOnGamePosition[1]];
  if(this.arraysAreIdentical(arrayPos,l2)){
    var direction="l2";
    return direction;
  }

  var t1 = [this.currentPawnOnGamePosition[0],this.currentPawnOnGamePosition[1]-2];
  if(this.arraysAreIdentical(arrayPos,t1)){
    var direction="t1";
    return direction;
  }

  var t2 = [this.currentPawnOnGamePosition[0],this.currentPawnOnGamePosition[1]-4];
  if(this.arraysAreIdentical(arrayPos,t2)){
    var direction="t2";
    return direction;
  }

  var b1 = [this.currentPawnOnGamePosition[0],this.currentPawnOnGamePosition[1]+2];
  if(this.arraysAreIdentical(arrayPos,b1)){
    var direction="b1";
    return direction;
  }

  var b2 = [this.currentPawnOnGamePosition[0],this.currentPawnOnGamePosition[1]+4];
  if(this.arraysAreIdentical(arrayPos,b2)){
    var direction="b2";
    return direction;
  }

  var dtr = [this.currentPawnOnGamePosition[0]+2,this.currentPawnOnGamePosition[1]-2];
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

  var dbl = [this.currentPawnOnGamePosition[0]-2,this.currentPawnOnGamePosition[1]+2];
  if(this.arraysAreIdentical(arrayPos,dbl)){
    var direction="dbl";
    return direction;
  }
  return false;
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
