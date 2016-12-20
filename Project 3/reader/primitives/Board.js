function Board(scene, reader, dimX , dimY) {
    CGFobject.call(this, scene);
    this.scene = scene;
    this.dimX = dimX * 2;
    console.log(dimX);
    this.dimY = dimY * 2;
    console.log(dimY);

    this.boardElements = new Array(dimX);

    this.createBoard();
};

Board.prototype = Object.create(CGFobject.prototype);
Board.prototype.constructor = Board;

Board.prototype.createBoard = function () {

var index = 1;
for(var i = 0; i < this.dimX-1; i++){
    this.boardElements[i] = new Array(dimY);
  for(var j=0;j< this.dimY-1;j++){
    if(i % 2 == 0){
      this.boardElements[i][j] = new Cube(this.scene,this.reader);
      this.scene.registerForPick(index, this.boardElements[i][j]);
      index++;
    }
    else{
      if(j%2 == 0){
        this.boardElements[i][j] = new Cube(this.scene,this.reader);
        this.scene.registerForPick(index, this.boardElements[i][j]);
        index++;
      }
      else this.boardElements[i][j] = " ";
    }
  }
}

console.log(this.scene.registerForPick);

}

Board.prototype.display = function () {

  for(var i=0;i<this.dimX-1;i++){
      for(var j=0;j< this.dimY-1;j++){
        if(i%2 == 0){
          if(j%2 == 0){
            this.scene.pushMatrix();

            this.scene.translate(j*0.76,0,i*0.76);
            this.scene.scale(1, 0.3, 1);

            this.boardElements[i][j].display();
            this.scene.popMatrix();
          }
          else{
            this.scene.pushMatrix();

            this.scene.translate(j*0.76,-0.25,i*0.76);
            this.scene.scale(0.3, 0.3, 1);

            this.boardElements[i][j].display();
            this.scene.popMatrix();
          }
        }
        else{
          if(j%2 == 0){
            this.scene.pushMatrix();

            this.scene.translate(j*0.76,-0.25,i*0.76);
            this.scene.scale(1, 0.3, 0.3);

            this.boardElements[i][j].display();
            this.scene.popMatrix();
          }
        }
      }
  }






}

Board.prototype.updateTexCoords = function (s, t) {

}
