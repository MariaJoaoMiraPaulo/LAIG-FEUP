function Button(scene, reader, player, type) {
  CGFobject.call(this, scene);
  this.scene = scene;
  this.player = player;
  this.type = type;

  //type 1 -stepOver
  //type 2 - Back

  this.ButtonTop = new Obj(this.scene,"img/arrow1.obj");

  switch (player) {
    case 1:
    if(type == 1){
      this.xPos=1;
      this.zPos=-5;
      this.yPos=0;
      this.texturePlayer = this.scene.orangeMaterial;
    }
    else{
      this.xPos=12;
      this.zPos=-5;
      this.yPos=0;
      this.texturePlayer = this.scene.orangeMaterial;
    }
      break;
    case 2:
    if(type == 1){
      this.xPos=12;
      this.zPos=15;
      this.yPos=0;
      this.texturePlayer = this.scene.yellowMaterial;
    }
    else{
      this.xPos=1;
      this.zPos=15;
      this.yPos=0;
      this.texturePlayer = this.scene.yellowMaterial;
    }
    break;
    default:
}

};

Button.prototype = Object.create(CGFobject.prototype);
Button.prototype.constructor = Button;

Button.prototype.display = function () {

  this.scene.pushMatrix();
  this.scene.translate(this.xPos,this.yPos,this.zPos+0.7);
  if(this.type == 2 && this.player == 1)
    this.scene.rotate(Math.PI/2,1,0,0);
  else if(this.type == 1 && this.player == 1){
     this.scene.rotate(Math.PI/2,1,0,0);
     this.scene.rotate(-Math.PI,0,0,1);
  }
  else if(this.type == 2 && this.player == 2){
    this.scene.rotate(Math.PI/2,1,0,0);
     this.scene.rotate(-Math.PI,0,0,1);
  }
  else this.scene.rotate(Math.PI/2,1,0,0);

  this.scene.scale(0.03,0.03,0.05);
  this.ButtonTop.display();
  this.scene.popMatrix();

}

Button.prototype.setButtonXCoord = function (x) {
  this.xPos = x;
}

Button.prototype.setButtonZCoord = function (z) {
  this.zPos = z;
}

Button.prototype.setButtonYCoord = function (y) {
  this.yPos = y;
}

Button.prototype.updateTexCoords = function (s, t) {

}
