function Wall(scene, reader, player) {
  CGFobject.call(this, scene);
  this.scene = scene;
  this.player = player;
  this.reader=reader;

  this.greenMaterial = new CGFappearance(this.scene);
  this.greenMaterial.setAmbient(0,1,0,1);
  this.greenMaterial.setDiffuse(0,1,0,1);
  this.greenMaterial.setSpecular(0,1,0,1);
  this.greenMaterial.setShininess(0);

  this.blueMaterial = new CGFappearance(this.scene);
  this.blueMaterial.setAmbient(0,0,1.0,1);
  this.blueMaterial.setDiffuse(0,0,1.0,1);
  this.blueMaterial.setSpecular(0,0,1.0,1);
  this.blueMaterial.setShininess(0);

  switch (player) {
    case 1:
    this.material = this.greenMaterial;
    break;
    case 2:
    this.material = this.blueMaterial;
    break;
    default:

  }

  this.wall = new Cube(this.scene,this.reader,null,null);


};

Wall.prototype = Object.create(CGFobject.prototype);
Wall.prototype.constructor = Wall;

Wall.prototype.display = function () {

  this.scene.pushMatrix();
  this.scene.translate(0,0.1,0.7);
  this.scene.scale(1,0.5,0.1);
  this.material.apply();
  this.wall.display();
  this.scene.popMatrix();
}

Wall.prototype.updateTexCoords = function (s, t) {

}
