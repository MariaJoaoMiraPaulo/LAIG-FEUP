function StartPos(scene, reader, player) {
  CGFobject.call(this, scene);
  this.scene = scene;
  this.player = player;

  this.StartPos = new Cylinder(this.scene, 0.25, 0.25, 0.025, 20, 20);


};

StartPos.prototype = Object.create(CGFobject.prototype);
StartPos.prototype.constructor = StartPos;

StartPos.prototype.display = function () {

  this.scene.pushMatrix();
  this.scene.rotate(Math.PI/2,1,0,0);
  this.StartPos.display();
  this.scene.popMatrix();
}

StartPos.prototype.updateTexCoords = function (s, t) {

}
