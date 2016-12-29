/**
 * Lamp
 * @constructor
 */
 function Lamp(scene, slices, stacks) {
 	CGFobject.call(this,scene);

	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 Lamp.prototype = Object.create(CGFobject.prototype);
 Lamp.prototype.constructor = Lamp;

 Lamp.prototype.initBuffers = function() {
 	this.vertices = [];
 	this.normals = [];
 	this.indices = [];

	var ang=(2*Math.PI)/this.slices;

	for(var i=0;i<this.slices;i++){
		this.vertices.push(Math.cos(ang*i), Math.sin(ang*i), 0);
		this.vertices.push(Math.cos(ang*(i+1)), Math.sin(ang*(i+1)), 0);
		this.vertices.push(0,0,1);

		this.indices.push(this.vertices.length - 3, this.vertices.length -2, this.vertices.length - 1);

		this.normals.push(Math.cos(ang*i), Math.sin(ang*i), 0);
		this.normals.push(Math.cos(ang*(i+1)), Math.sin(ang*(i+1)), 0);
		this.normals.push(0,0,1);
	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
