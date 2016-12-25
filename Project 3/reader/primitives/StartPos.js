function StartPos(scene, reader, player) {
  CGFobject.call(this, scene);
  this.scene = scene;
  this.player = player;

  this.orangeMaterial = new CGFappearance(this.scene);
  this.orangeMaterial.setAmbient(1.0,1,1,1);
  this.orangeMaterial.setDiffuse(1.0,1,1,1);
  this.orangeMaterial.setSpecular(1.0,1,1,1);
  this.orangeMaterial.setShininess(0);
  this.orangeMaterial.loadTexture("img/1.jpg");

  this.yellowMaterial = new CGFappearance(this.scene);
  this.yellowMaterial.setAmbient(1.0,1,1,1);
  this.yellowMaterial.setDiffuse(1.0,1,1,1);
  this.yellowMaterial.setSpecular(1.0,1,1,1);
  this.yellowMaterial.setShininess(0);
  this.yellowMaterial.loadTexture("img/2.jpg");

  switch (player) {
    case 1:
      this.material = this.orangeMaterial;
      break;
    case 2:
      this.material = this.yellowMaterial;
      break;
    default:

  }

  this.StartPos = new Cylinder(this.scene, 0.25, 0.25, 0.025, 20, 20);


};

StartPos.prototype = Object.create(CGFobject.prototype);
StartPos.prototype.constructor = StartPos;

StartPos.prototype.display = function () {

  this.scene.pushMatrix();
  this.scene.rotate(Math.PI/2,1,0,0);
  this.material.apply();
  this.StartPos.display();
  this.scene.popMatrix();
}

StartPos.prototype.updateTexCoords = function (s, t) {

}
