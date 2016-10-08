  function Sphere(scene, reader, newElement)  {
 	CGFobject.call(this,scene);

  this.newElement = newElement;
  this.reader = reader;
  this.sceneGraph = scene;
	this.slices = this.reader.getInteger(this.newElement,'slices');
  this.stacks = this.reader.getInteger(this.newElement,'stacks');
  this.radius = this.reader.getFloat(this.newElement,'radius');

  this.SemiSphere1 = new SemiSphere(this.scene, this.slices, this.stacks, this.radius);
  this.SemiSphere2 = new SemiSphere(this.scene, this.slices, this.stacks, this.radius);
 	this.initBuffers();
 };

 Sphere.prototype = Object.create(CGFobject.prototype);
 Sphere.prototype.constructor = Sphere;

 Sphere.prototype.display = function() {

 this.scene.pushMatrix();
  this.scene.scale(this.radius,this.radius,this.radius);
 	this.SemiSphere1.display();
 this.scene.popMatrix();

 	this.scene.pushMatrix();
    this.scene.scale(this.radius,this.radius,this.radius);
 		this.scene.rotate(Math.PI, 0, 1, 0);
 		this.SemiSphere2.display();
 	this.scene.popMatrix();
 }
