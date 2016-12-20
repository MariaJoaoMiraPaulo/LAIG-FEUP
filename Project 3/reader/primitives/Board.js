function Board(scene, reader, dimX , dimY) {
    CGFobject.call(this, scene);
    this.scene = scene;
    this.reader = reader;
    this.dimX = dimX * 2;
    console.log(dimX);
    this.dimY = dimY * 2;
    console.log(dimY);

    this.boardElements = new Array(dimX);
    this.base = new Cube(this.scene,this.reader,null,null);

    // this.woodBase = new CGFappearance(this.scene);
    // this.woodBase.loadTexture("img/woodBase.jpg");

  /*  this.cell = new CGFappearance(this.scene);
    this.cell.loadTexture("img/board.jpg");

    this.bottom = new CGFappearance(this.scene);
    this.bottom.loadTexture("img/board2.jpg");*/

    this.createBoard();
};

Board.prototype = Object.create(CGFobject.prototype);
Board.prototype.constructor = Board;

Board.prototype.createBoard = function () {


for(var i = 0; i < this.dimX-1; i++){
    this.boardElements[i] = new Array(dimY);
  for(var j=0;j< this.dimY-1;j++){
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
  for(var i=0;i<this.dimX-1;i++){
      for(var j=0;j< this.dimY-1;j++){
        if(i%2 == 0){
          if(j%2 == 0){
            this.scene.pushMatrix();

            this.scene.translate(j*0.68,0,i*0.68);
            this.scene.scale(1, 0.3, 1);
            this.scene.registerForPick(index, this.boardElements[i][j]);
            index++;
          //  this.cell.apply();
            this.boardElements[i][j].display();
            this.scene.popMatrix();
          }
          else{
            this.scene.pushMatrix();

            this.scene.translate(j*0.68,-0.1,i*0.68);
            this.scene.scale(0.3, 0.2, 1);
            this.scene.registerForPick(index, this.boardElements[i][j]);
            index++;
          //  this.bottom.apply();
            this.boardElements[i][j].display();
            this.scene.popMatrix();
          }
        }
        else{
          if(j%2 == 0){
            this.scene.pushMatrix();

            this.scene.translate(j*0.68,-0.1,i*0.68);
            this.scene.scale(1, 0.2, 0.3);
            this.scene.registerForPick(index, this.boardElements[i][j]);
            index++;
            //this.bottom.apply();
            this.boardElements[i][j].display();
            this.scene.popMatrix();
          }
        }
      }
  }

//   this.scene.pushMatrix();
//   //this.scene.translate(this.dimX/2-1,-0.8,this.dimY/4-1);
//   this.scene.scale(this.dimX,0.5,this.dimY/2);
// //  this.woodBase.apply();
//   this.base.display();
//   this.scene.popMatrix();

}

Board.prototype.updateTexCoords = function (s, t) {

}
