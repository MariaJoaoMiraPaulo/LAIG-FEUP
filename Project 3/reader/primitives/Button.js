function Button(scene, reader, player, type) {
  CGFobject.call(this, scene);
  this.scene = scene;
  this.player = player;
  this.type = type;

  this.b = new CGFappearance(this.scene);
  this.b.setAmbient(1.0,1,1,1);
  this.b.setDiffuse(1.0,1,1,1);
  this.b.setSpecular(1.0,1,1,1);
  this.b.setShininess(0);
  this.b.loadTexture("img/b.jpg");

  this.b2 = new CGFappearance(this.scene);
  this.b2.setAmbient(1.0,1,1,1);
  this.b2.setDiffuse(1.0,1,1,1);
  this.b2.setSpecular(1.0,1,1,1);
  this.b2.setShininess(0);
  this.b2.loadTexture("img/b.jpg");

  this.p1 = new CGFappearance(this.scene);
  this.p1.setAmbient(0,0.2,1,0);
  this.p1.setDiffuse(0,0.2,1,0);
  this.p1.setSpecular(0,0.2,1,0);
  this.p1.setShininess(0);

  this.p2 = new CGFappearance(this.scene);
  this.p2.setAmbient(1,0.2,0,0);
  this.p2.setDiffuse(1,0.2,0,0);
  this.p2.setSpecular(1,0.2,0,0);
  this.p2.setShininess(0);



  switch (player) {
    case 1:
    if(type == 1){
      this.xPos=1;
      this.zPos=-3;
      this.yPos=0.1;
      this.texture = this.b;
      this.texturePlayer = this.p1;
    }
    else{
      this.xPos=12;
      this.zPos=-3;
      this.yPos=0.1;
      this.texture = this.b2;
      this.texturePlayer = this.p1;
    }
      break;
    case 2:
    if(type == 1){
      this.xPos=1;
      this.zPos=16;
      this.yPos=0.1;
      this.texture = this.b;
      this.texturePlayer = this.p2;
    }
    else{
      this.xPos=12;
      this.zPos=16;
      this.yPos=0.1;
      this.texture = this.b2;
      this.texturePlayer = this.p2;
    }

    break;
    default:

}


  this.Button = new Cube(this.scene,this.reader,null,null);
  this.ButtonTop= new Cube(this.scene,this.reader,null,null);

};

Button.prototype = Object.create(CGFobject.prototype);
Button.prototype.constructor = Button;

Button.prototype.display = function () {

  this.scene.pushMatrix();
  this.scene.translate(this.xPos,this.yPos+0.5,this.zPos);
  this.scene.rotate(Math.PI,1,0,0);
  this.scene.scale(1.2,0.7,1.2);
  this.texturePlayer.apply();
  this.Button.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.translate(this.xPos,this.yPos +0.55,this.zPos);
  this.scene.rotate(Math.PI,1,0,0);
  this.scene.scale(1,0.2,1);
  this.texture.apply();
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
