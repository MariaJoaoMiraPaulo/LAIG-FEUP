function Board(scene, reader, dimX , dimZ) {
  CGFobject.call(this, scene);
  this.scene = scene;
  this.reader = reader;
  this.dimX = dimX;
  this.doubleDimX = dimX*2;
  this.dimZ = dimZ;
  this.doubleDimZ = dimZ*2;



  this.distanceBetweenCubes = 1.3;
  this.distanceBetweenFloor= 1.3;
  this.cubeSize = 1;
  this.floorSize = 0.3;
  this.floorHeigth = -0.1;


  this.boardElements = new Array(this.doubleDimZ-2);
  this.base = new Cube(this.scene,this.reader,null,null);
  
  var xTab = this.dimX * this.cubeSize  + (this.dimX-1)*this.floorSize;
  var zTab = this.dimZ * this.cubeSize  + (this.dimZ-1)*this.floorSize;



  var x=0.34*dimX;
  var x1 = 1.21*dimX;
  var y = 0.4;
  var z=0.27*dimZ;
  var z1 =0.67*dimZ;
  //
  this.startPos11=[xTab,0.4,0];
  this.startPos21=[0,0.4,zTab];
  //  this.startPos11=[x,y,z];
  //this.startPos21=[x1,y,z1];
  this.startPos12=[0,0,0];
  this.startPos22=[0,0,0];

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

  var index = 1;
  for(var z=0;z<this.dimZ;z++){
    for(var x=0;x< this.dimX;x++){

      this.scene.pushMatrix();

      this.scene.translate(this.distanceBetweenCubes*x+0.5,0,this.distanceBetweenCubes*z+0.5);
      this.scene.scale(1, 0.3, 1);
      this.scene.registerForPick(index, this.boardElements[z*2][x*2]);
      index++;
      this.boardElements[z*2][x*2].display();

      this.scene.popMatrix();

    }
  }

  for(var z=0;z<this.dimZ -1 ;z++){
    for(var x=0;x< this.dimX ;x++){
      this.scene.pushMatrix();

      this.scene.translate(this.distanceBetweenFloor*x+0.5,0,this.distanceBetweenFloor*z+1.2);
      this.scene.scale(1, 0.2, 0.3);
      this.scene.registerForPick(index, this.boardElements[z*2+1][x*2]);
      index++;
      this.boardElements[z*2+1][x*2].display();

      this.scene.popMatrix();
    }
  }

  for(var z=0;z<this.dimZ ;z++){
    for(var x=0;x< this.dimX -1 ;x++){
      this.scene.pushMatrix();

      this.scene.translate(this.distanceBetweenFloor*x+1.2,0,this.distanceBetweenFloor*z+0.5);
      this.scene.scale(0.3, 0.2, 1);
      this.scene.registerForPick(index, this.boardElements[z*2][x*2+1]);
      index++;
      this.boardElements[z*2][x*2+1].display();

      this.scene.popMatrix();
    }
  }

}


Board.prototype.updateTexCoords = function (s, t) {

}
