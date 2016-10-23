/**
 * Circle
 * @param scene CGFscene where the Circle will be displayed
 * @param slices ammount of slices the Circle will be divided
 * @constructor
 */
function Circle(scene, slices) {
    CGFobject.call(this, scene);

    this.slices = slices;

    this.initBuffers();
};

Circle.prototype = Object.create(CGFobject.prototype);
Circle.prototype.constructor = Circle;

/**
 * Initializes the Circle buffers (vertices, indices, normals and texCoords)
 */
Circle.prototype.initBuffers = function() {
    this.vertices = [];
    this.normals = [];
    this.indices = [];
    this.originalTexCoords = [];
    this.originalTexCoords.push(0.5, 0.5);

    var ang = (2 * Math.PI) / this.slices;
    var xCoord;
    var yCoord;

    for (j = 0; j < this.slices; j++) {
        xCoord = Math.cos(ang * j);
        yCoord = Math.sin(ang * j);
        this.vertices.push(Math.cos(ang * j), Math.sin(ang * j), 0);
        this.normals.push(Math.cos(ang * j), Math.sin(ang * j), 0);
        this.originalTexCoords.push(0.5+Math.cos(ang * i)/2, 0.5 - Math.sin(ang * i)/2);
		    this.originalTexCoords.push(0.5+Math.cos(ang * (i+1))/2,0.5 - Math.sin(ang * (i+1))/2);
		    this.originalTexCoords.push(0.5,0.5);
    }

    this.vertices.push(0, 0, 0);
    this.normals.push(0, 0, 0);

    for (i = 0; i < this.slices - 1; i++) {
        this.indices.push(i, i + 1, this.slices);
    }

    this.indices.push(this.slices - 1, 0, this.slices);
    this.texCoords = this.originalTexCoords.slice();

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};

/**
 * Updates the Circle amplification factors
 * @param s s domain amplification factor
 * @param t t domain amplification factor
 */
Circle.prototype.updateTexCoords = function(s,t) {
  for (var i = 0; i < this.texCoords.length; i += 2) {
      this.texCoords[i] = this.originalTexCoords[i] / s;
      this.texCoords[i + 1] = this.originalTexCoords[i+1] / t;
    }

    this.updateTexCoordsGLBuffers();
};
