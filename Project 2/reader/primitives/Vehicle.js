function Vehicle(scene, reader) {
    CGFobject.call(this, scene);
    this.scene = scene;
    this.reader = reader;
    var points =[
        [-0.863,-0.441,-1.061,1],
        [-1.221,-0.110,-1.053,1],
        [-1.116,0.362,-1.010,1],
        [-0.790,0.544,-1.079,1],

        [-0.586,-0.551,-1.072,1],
        [-0.500,-0.500,1.000,1],
        [-0.500,0.500,1.000,1],
        [-0.615,0.608,-1.107,1],

        [-0.463,-0.552,-1.092,1],
        [0.500,-0.500,1.000,1],
        [-0.102,0.513,0.977,1],
        [-0.471,0.631,-1.133,1],

        [-0.242,-0.531,-1.1090,1],
        [0.098,-0.467,-1.187,1],
        [0.466,0.437,-1.135,1],
        [-0.250,0.580,-1.162,1]];

    var points8 = [[1.5, 4, -4.8, 1],[-1.5, 4, -4.8, 1],
    								[1.5, 0, -4.8, 1],[-1.5, 0, -4.8, 1]];

    //this.front = new Patch(this.scene, 3, 4, 20, 20, points);*/

    this.body=new Cylinder(this.scene,1.5,1.5,7,50,50);
    this.body2=new Cylinder(this.scene,1.5,0,2,50,50);
    this.face = new Patch(this.scene,3,3,20,20,points);
    this.back = new Patch(this.scene,1,1,20,20,points8);

};

Vehicle.prototype = Object.create(CGFobject.prototype);
Vehicle.prototype.constructor = Vehicle;

/**
 * Adds the base and the top of the Vehicle. Updates Vehicle's height
 */
Vehicle.prototype.display = function () {

  /*this.scene.pushMatrix();
//  this.face.display();
//  this.body.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.translate(0,0,7);
//  this.body2.display();
  this.scene.popMatrix();*/

  this.face.display();


}

Vehicle.prototype.updateTexCoords = function (s, t) {

}
