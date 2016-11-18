function Vehicle(scene, reader) {
    CGFobject.call(this, scene);
    this.scene = scene;
    this.reader = reader;
  /*  var points = [[-1.5, 0, 1, 1], [-2, 1, 0.8, 1], [-2, 1, -0.8, 1], [-1.5, 2, -0.8, 1], [-1.5, 4, -0.8, 1],
        [0, 0, 1, 1], [0, 1, 0.8, 1], [0, 1, -0.8, 1], [0, 2, -0.8, 1], [0, 4, -0.8, 1],
        [1, 0, 1, 1], [1, 1, 0.8, 1], [1, 1, -0.8, 1], [1, 2, -0.8, 1], [1, 4, -0.8, 1],
        [1.5, 0, 1, 1], [2, 1, 0.8, 1], [2, 1, -0.8, 1], [1.5, 2, -0.8, 1], [1.5, 4, -0.8, 1]];


    this.front = new Patch(this.scene, 3, 4, 20, 20, points);*/

    this.body=new Cylinder(this.scene,1.5,1.5,7,50,50);
    this.body2=new Cylinder(this.scene,1.5,0,2,50,50);

};

Vehicle.prototype = Object.create(CGFobject.prototype);
Vehicle.prototype.constructor = Vehicle;

/**
 * Adds the base and the top of the Vehicle. Updates Vehicle's height
 */
Vehicle.prototype.display = function () {

  this.scene.pushMatrix();
  this.body.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.translate(0,0,7);
  this.body2.display();
  this.scene.popMatrix();


}

Vehicle.prototype.updateTexCoords = function (s, t) {

}
