/**
 * CylinderWithNoCover
 * @param scene CGFscene where the Cylinder will be displayed
 * @param slices ammount of slices the Cylinder will be divided into along it's perimeter
 * @param stacks ammount of stacks the Cylinder will be divided along it's height
 * @param base radius of the bottom base of the cylinder
 * @param top radius of the top base of the cylinder

 * @constructor
 */
function CylinderWithNoCover(scene, slices, stacks, base, top) {
    CGFobject.call(this, scene);

    this.slices = slices;
    this.stacks = stacks;
    this.baseRadius = base;
    this.topRadius = top;

    this.initBuffers();
};

CylinderWithNoCover.prototype = Object.create(CGFobject.prototype);
CylinderWithNoCover.prototype.constructor = CylinderWithNoCover;

/**
 * Initializes the CylinderWithNoCover buffers (vertices, indices, normals and texCoords)
 */
CylinderWithNoCover.prototype.initBuffers = function() {
    this.vertices = [];
    this.normals = [];
    this.indices = [];
    this.originalTexCoords = [];

    var patchLengthx = 1 / this.slices;
    var patchLengthy = 1 / this.stacks;
    var xCoord = 0;
    var yCoord = 0;
    var ang = (2 * Math.PI) / this.slices;
    var zCoord = 0;
    var zLength = 1 / this.stacks;
    var deltaRadius = (this.topRadius - this.baseRadius) / this.stacks;

    for (i = 0; i <= this.stacks; i++) {
        delta = (deltaRadius * i) + this.baseRadius;
        for (j = 0; j < this.slices; j++) {
            this.vertices.push(delta * Math.cos(ang * j), delta * Math.sin(ang * j), zCoord);
            this.normals.push(delta * Math.cos(ang * j), delta * Math.sin(ang * j), zCoord);
            this.originalTexCoords.push(xCoord, yCoord);
            xCoord += patchLengthx;
        }
        xCoord = 0;
        yCoord += patchLengthy;
        zCoord += zLength;
    }

    for (i = 0; i < this.stacks; i++) {
        for (j = 0; j < this.slices - 1; j++) {
            this.indices.push(i * this.slices + j, i * this.slices + j + 1, (i + 1) * this.slices + j);
            this.indices.push(i * this.slices + j + 1, (i + 1) * this.slices + j + 1, (i + 1) * this.slices + j);
        }

        this.indices.push(i * this.slices + this.slices - 1, i * this.slices, (i + 1) * this.slices + this.slices - 1);
        this.indices.push(i * this.slices, i * this.slices + this.slices, (i + 1) * this.slices + this.slices - 1);
    }

    this.texCoords = this.originalTexCoords.slice();

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};

/**
 * Updates the CylinderWithNoCover amplification factors
 * @param s s domain amplification factor
 * @param t t domain amplification factor
 */
CylinderWithNoCover.prototype.updateTexCoords = function(s, t) {
    for (var i = 0; i < this.texCoords.length; i += 2) {
        this.texCoords[i] = this.originalTexCoords[i] / s;
        this.texCoords[i + 1] = this.originalTexCoords[i + 1] / t;
    }

    this.updateTexCoordsGLBuffers();
};
