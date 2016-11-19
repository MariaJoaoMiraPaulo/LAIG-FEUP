function Vehicle(scene, reader) {
    CGFobject.call(this, scene);
    this.scene = scene;
    this.reader = reader;
    var points =[
        [-0.863,-0.441,-1.0,1],
        [-1.221,-0.110,-1.0,1],
        [-1.116,0.362,-1.0,1],
        [-0.6,0.6,-1.0,1],

        [-0.586,-0.551,-1.0,1],
        [-0.500,-0.500,1,1],
        [-0.500,0.500,1,1],
        [-0.6,0.6,-1.0,1],

        [-0.463,-0.552,-1.0,1],
        [0.500,-0.500,1,1],
        [-0.102,0.513,1,1],
        [-0.6,0.6,-1.0,1],

        [-0.242,-0.531,-1.0,1],
        [0.098,-0.467,-1.0,1],
        [0.466,0.437,-1.0,1],
        [-0.6,0.6,-1.0,1]];

        var points2 =[
            [-0.006,0.112,0.0,1],
            [0.000,0.200,0.05,1],
            [0.000,0.400,0.1,1],
            [0.000,0.500,0.05,1],

            [0.500,0.000,0.0,1],
            [0.500,0.200,0.05,1],
            [0.500,0.300,0.1,1],
            [0.500,0.400,0.05,1],

            [1.000,0.000,0.0,1],
            [1.000,0.100,0.05,1],
            [1.000,0.200,0.1,1],
            [1.000,0.300,0.05,1],

            [1.276,0.020,0.0,1],
            [1.500,0.050,0.05,1],
            [1.500,0.100,0.1,1],
            [1.500,0.200,0.05,1]];

    //this.front = new Patch(this.scene, 3, 4, 20, 20, points);*/

    this.body=new Cylinder(this.scene,1.5,1.5,7,50,50);
    this.body2=new Cylinder(this.scene,1.5,0,2,50,50);
    this.face = new Patch(this.scene,3,3,20,20,points);
    this.asa1 = new Patch(this.scene,3,3,20,20,points2);



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
  //this.scene.rotate((-6*Math.PI/180),1,0,0);
  this.scene.translate(1.2,0,9.4);
  this.scene.scale(2.5,2.5,2.5);
  this.face.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.translate(1.5,0,6);
  this.scene.scale(4,4,6);
  this.scene.rotate((-90*Math.PI/180),1,0,0);
  this.scene.rotate((-20*Math.PI/180),1,1,0);
  this.asa1.display();
  this.scene.popMatrix();




}

Vehicle.prototype.updateTexCoords = function (s, t) {

}
