/**
 * Torus
 * @param scene CGFscene where the Torus will be displayed
 * @param reader CGFXMLreader
 * @param newElement tag Torus to be read
 * @constructor
 */
function Torus(scene, inner, outer, slices, loops) {
    CGFobject.call(this, scene);

    this.scene = scene;

    this.inner = inner;
    this.outer = outer;
    this.slices = slices;
    this.loops = loops;

    this.initBuffers();
};

Torus.prototype = Object.create(CGFobject.prototype);
Torus.prototype.constructor = Torus;

/**
 * Initializes the Torus buffers (vertices, indices, normals and texCoords)
 */
Torus.prototype.initBuffers = function() {


    this.vertices = [];
    this.normals = [];
    this.indices = [];
    this.originalTexCoords = [];

    var angSlices = (2 * Math.PI) / this.slices;
    var angLoops = (2 * Math.PI) / this.loops;
    var texS = 1 / this.loops;
    var texT = 1 / this.slices;

    for (let i = 0; i <= this.loops; i++) {
        for (let j = 0; j <= this.slices; j++) {
            let u = angLoops * i;
            let v = angSlices * j;

            let x = (this.outer + this.inner * Math.cos(v)) * Math.cos(u);
            let y = (this.outer + this.inner * Math.cos(v)) * Math.sin(u);
            let z = this.inner * Math.sin(v);

            this.vertices.push(x, y, z);
            this.normals.push(x, y, z);

            var s = 1 - i * texS;
            var t = 1 - j * texT;
            this.originalTexCoords.push(s, t);
        }

    }

    for (let i = 0; i < this.loops; i++) {
        for (let j = 0; j < this.slices; j++) {
            this.indices.push(j * (this.slices + 1) + i, j * (this.slices + 1) + i + this.slices + 1,
                j * (this.slices + 1) + i + this.slices + 2);
            this.indices.push(j * (this.slices + 1) + i, j * (this.slices + 1) + i + this.slices + 2,
                j * (this.slices + 1) + i + 1);
        }
    }

    this.texCoords = this.originalTexCoords.slice();
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};

/**
 * Updates the Torus amplification factors
 * @param s s domain amplification factor
 * @param t t domain amplification factor
 */
Torus.prototype.updateTexCoords = function(s,t) {
  for (var i = 0; i < this.texCoords.length; i += 2) {
      this.texCoords[i] = this.originalTexCoords[i] / s;
      this.texCoords[i + 1] = this.originalTexCoords[i+1] / t;
    }

    this.updateTexCoordsGLBuffers();
};
