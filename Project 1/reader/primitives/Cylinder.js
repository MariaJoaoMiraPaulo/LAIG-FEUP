function Cylinder(scene,base, top, height, slices, stacks) {
	CGFobject.call(this,scene);
	this.scene = scene;
	this.slices = slices;
	this.stacks = stacks;
	this.height=height;

	this.cylinder = new CylinderWithNoTop(scene, slices, stacks);
	this.top = new Circle(scene, slices);
	this.bottom = new Circle(scene, slices);
};

Cylinder.prototype = Object.create(CGFobject.prototype);
Cylinder.prototype.constructor=Cylinder;

Cylinder.prototype.display = function() {

	this.cylinder.display();

	this.scene.pushMatrix();
		this.scene.translate(0, 0, 1);
		this.top.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.bottom.display();
	this.scene.popMatrix();
}
