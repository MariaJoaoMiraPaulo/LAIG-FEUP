function CylinderWithNoCover(scene, slices, stacks) {
 	CGFobject.call(this,scene);

	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 CylinderWithNoCover.prototype = Object.create(CGFobject.prototype);
 CylinderWithNoCover.prototype.constructor = CylinderWithNoCover;

 CylinderWithNoCover.prototype.initBuffers = function() {
 	this.vertices = [];
 	this.normals = [];
 	this.indices = [];
 	this.texCoords = [];

 	var patchLengthx = 1 / this.slices;
 	var patchLengthy = 1 / this.stacks;
 	var xCoord =0;
 	var yCoord =0;
	var ang=(2*Math.PI)/this.slices;
  var zCoord = 0;
  var zLength = 1/this.stacks;

	for(i = 0; i <= this.stacks; i++) {
		for(j = 0; j < this.slices; j++) {
			this.vertices.push(Math.cos(ang*j),Math.sin(ang*j),zCoord);
			this.normals.push(Math.cos(ang*j),Math.sin(ang*j),zCoord);
			this.texCoords.push(xCoord, yCoord);
			xCoord += patchLengthx;
		}
		xCoord =0;
		yCoord += patchLengthy;
    zCoord += zLength;
	}

	for(i = 0; i < this.stacks; i++) {
		for(j = 0; j < this.slices - 1; j++) {
			this.indices.push(i*this.slices + j, i*this.slices + j+1, (i+1)*this.slices + j);
			this.indices.push(i*this.slices + j+1, (i+1)*this.slices + j+1, (i+1)*this.slices + j);
		}

		this.indices.push(i*this.slices + this.slices - 1, i*this.slices, (i+1)*this.slices + this.slices - 1);
		this.indices.push(i*this.slices, i*this.slices + this.slices, (i+1)*this.slices + this.slices - 1);
	}


 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
