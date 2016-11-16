function Vehicle(scene, reader) {
	CGFobject.call(this,scene);
	this.scene = scene;
	this.reader = reader;
	var points = [[-1.5,0,1,1],[-2,1,2.4,1],[-2,3,-3.5,1],[-1.5,6,-5,1],
								[0,0,1,1],[0,1,2.4,1],[0,3,-3.5,1],[0,6,-5,1],
								[1,0,1,1],[1,1,2.4,1],[1,3,-3.5,1],[1,6,-5,1],
								[1.5,0,1,1],[2,1,2.4,1],[2,3,-3.5,1],[1.5,6,-5,1]];

	console.log("entrei");
	console.log(points);
	this.front = new Patch(this.scene,3,3,20,20,points);

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
}

Vehicle.prototype.updateTexCoords = function(s,t) {
	this.front.updateTexCoords(s,t);
}
