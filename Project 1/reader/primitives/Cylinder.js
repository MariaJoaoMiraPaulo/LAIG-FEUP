/**
 * Cylinder
 * @param scene CGFscene where the Cylinder will be displayed
 * @param reader CGFXMLreader
 * @param newElement tag Cylinder to be read
 * @constructor
 */
function Cylinder(scene, reader, newElement) {
	CGFobject.call(this,scene);
	this.scene = scene;
	this.reader = reader;
	this.newElement = newElement;

	this.baseRadius = this.reader.getFloat(this.newElement,'base');
	this.topRadius = this.reader.getFloat(this.newElement,'top');
	this.height = this.reader.getFloat(this.newElement,'height');
	this.slices = this.reader.getFloat(this.newElement,'slices');
	this.stacks = this.reader.getFloat(this.newElement,'stacks');


	this.cylinder = new CylinderWithNoCover(this.scene, this.slices, this.stacks, this.baseRadius, this.topRadius);
	this.top = new Circle(this.scene, this.slices);
	this.bottom = new Circle(this.scene, this.slices);
};

Cylinder.prototype = Object.create(CGFobject.prototype);
Cylinder.prototype.constructor=Cylinder;

/**
 * Adds the base and the top of the cylinder. Updates cylinder's height
 */
Cylinder.prototype.display = function() {

this.scene.pushMatrix();
	this.scene.scale(1,1,this.height);
	this.cylinder.display();
this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0, 0, this.height);
		this.scene.scale(this.topRadius,this.topRadius,1);
		this.top.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.scene.scale(this.baseRadius,this.baseRadius,1);
		this.bottom.display();
	this.scene.popMatrix();
}

Cylinder.prototype.updateTexCoords = function(s,t) {
	this.cylinder.updateTexCoords(s,t);
	this.top.updateTexCoords(s,t);
	this.bottom.updateTexCoords(s,t);
}
