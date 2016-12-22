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

    var x = Math.floor(this.dimX/3);
    var x1 = this.dimX-(x+1);
    var y = 0.4;
    var z = Math.floor(this.dimY/3);
    var z1 = this.dimY-(z+1);
    
    this.startPos11=[x,y,z];
    this.startPos12=[x1,y,z1];
    this.startPos21=[x,y,z1];
    this.startPos22=[x1,y,z];

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
            this.boardElements[i][j].display();

            this.scene.popMatrix();
          }
          else{
            this.scene.pushMatrix();

            this.scene.translate(j*0.68,-0.1,i*0.68);
            this.scene.scale(0.3, 0.2, 1);
            this.scene.registerForPick(index, this.boardElements[i][j]);
            index++;
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
            this.boardElements[i][j].display();

            this.scene.popMatrix();
          }
        }
      }
  }
}

Board.prototype.updateTexCoords = function (s, t) {

}
