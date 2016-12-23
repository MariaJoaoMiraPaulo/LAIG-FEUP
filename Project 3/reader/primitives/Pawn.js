function Pawn(scene, reader, player) {
  CGFobject.call(this, scene);
  this.scene = scene;
  this.player = player;
  this.xPos=0;
  this.zPos=0;
  this.yPos=2;

  this.orangeMaterial = new CGFappearance(this.scene);
  this.orangeMaterial.setAmbient(1.0,0.5,0,1);
  this.orangeMaterial.setDiffuse(1.0,0.5,0,1);
  this.orangeMaterial.setSpecular(1.0,0.5,0,1);
  this.orangeMaterial.setShininess(0);

  this.yellowMaterial = new CGFappearance(this.scene);
  this.yellowMaterial.setAmbient(1,1.0,0.0,1);
  this.yellowMaterial.setDiffuse(1.0,1.0,0.0,1);
  this.yellowMaterial.setSpecular(1.0,1.0,0.0,1);
  this.yellowMaterial.setShininess(0);

  switch (player) {
    case 1:
      this.material = this.orangeMaterial;
      break;
    case 2:
      this.material = this.yellowMaterial;
    break;
    default:

  }

  this.pawn = new Cylinder(this.scene, 0.23, 0.23, 1, 20, 20);

};

Pawn.prototype = Object.create(CGFobject.prototype);
Pawn.prototype.constructor = Pawn;

Pawn.prototype.display = function () {

  this.scene.pushMatrix();
  this.scene.translate(this.xPos,this.yPos,this.zPos);
  this.scene.rotate(Math.PI/2,1,0,0);
  this.material.apply();
  this.pawn.display();
  this.scene.popMatrix();

}

Pawn.prototype.setPawnXCoord = function (x) {
  this.xPos = x;
}

Pawn.prototype.setPawnZCoord = function (z) {
  this.zPos = z;
}

Pawn.prototype.setPawnYCoord = function (y) {
  this.yPos = y;
}

Pawn.prototype.updateTexCoords = function (s, t) {

}
