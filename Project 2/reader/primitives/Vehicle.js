function Vehicle(scene, reader) {
	CGFobject.call(this,scene);
	this.scene = scene;
	this.reader = reader;
	var points = [[-1.5,0,1,1],[-2,1,0.8,1],[-2,1,-0.8,1],[-1.5,2,-0.8,1],
								[0,0,1,1],[0,1,0.8,1],[0,1,-0.8,1],[0,2,-0.8,1],
								[1,0,1,1],[1,1,0.8,1],[1,1,-0.8,1],[1,2,-0.8,1],
								[1.5,0,1,1],[2,1,0.8,1],[2,1,-0.8,1],[1.5,2,-0.8,1]];

var points2 = [[1.5,0,1,1],[2,1,0.8,1],[2,1,-0.8,1],[1.5,2,-0.8,1],
								[1.5,0,-1,1],[1.5,0.8,-1,1],[1.5,1,-1,1],[1.5,2,-1,1],
								[1.5,0,-1,1],[1.5,0.8,-1,1],[1.5,1,-1,1],[1.5,2,-1,1]];

var points3 = [[-1.5,0,1,1],[-2,1,0.8,1],[-2,1,-0.8,1],[-1.5,2,-0.8,1],
								[-1.5,0,-1,1],[-1.5,0.8,-1,1],[-1.5,1,-1,1],[-1.5,2,-1,1],
								[-1.5,0,-1,1],[-1.5,0.8,-1,1],[-1.5,1,-1,1],[-1.5,2,-1,1]];

/*var points4 = [[-1.5,2,-0.8,1], [-1.8,2.2,-1.4,1], [-1.8,2,-2,1], [-1.5,2,-2.8,1],
 							 [-1.3,2,-0.8,1], [-1.3,2.2,-1.4,1], [-1.3,2,-2,1], [-1.3,2,-2.8,1],
							 [-1.1,2,-0.8,1], [-0.8,2.2,-1.4,1], [-0.8,2,-2,1], [-1.1,2,-2.8,1]];*/



	this.front = new Patch(this.scene,3,3,20,20,points);
	this.doorLeft = new Patch(this.scene,2,3,20,20,points2);
	this.doorRight = new Patch(this.scene,2,3,20,20,points3);
	this.rect = new Rectangle(this.scene,0.5,0.5,-0.5,-0.5);
//	this.ceiling = new Patch(this.scene, 3,3,20,20,points4);
	//this.wheel1 = new Cylinder();


};

Vehicle.prototype = Object.create(CGFobject.prototype);
Vehicle.prototype.constructor=Vehicle;

/**
 * Adds the base and the top of the Vehicle. Updates Vehicle's height
 */
Vehicle.prototype.display = function() {

this.scene.pushMatrix();
	this.front.display();
this.scene.popMatrix();

this.scene.pushMatrix();
	this.doorLeft.display();
this.scene.popMatrix();

this.scene.pushMatrix();
	this.scene.translate(1.5,1,-3.5);
	this.scene.rotate(-Math.PI/2,0,1,0);
	this.scene.scale(5,2,2);
	this.rect.display();
this.scene.popMatrix();

this.scene.pushMatrix();
	//this.scene.rotate(Math.PI,0,1,0);
//	this.doorRight.display();
this.scene.popMatrix();

this.scene.pushMatrix();
//	this.ceiling.display();
this.scene.popMatrix();
}

Vehicle.prototype.updateTexCoords = function(s,t) {
	this.front.updateTexCoords(s,t);
}
