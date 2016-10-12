function Torus(scene, reader, newElement) {
    CGFobject.call(this, scene);

    this.reader = reader;
    this.newElement = newElement;
    this.values = {};
    this.innerRadius = this.reader.getFloat(this.newElement, 'inner');
    this.outerRadius = this.reader.getFloat(this.newElement, 'outer');
    this.slices = this.reader.getInteger(this.newElement, 'slices');
    this.loops = this.reader.getInteger(this.newElement, 'loops');
    this.minS = 0;
    this.maxS = 1;
    this.minT = 0;
    this.maxT = 1;

    this.initBuffers();
};

Torus.prototype = Object.create(CGFobject.prototype);
Torus.prototype.constructor = Torus;

Torus.prototype.initBuffers = function() {
    this.vertices = [];
    this.normals = [];
    this.indices = [];

    var angSlices = (2 * Math.PI) / this.slices;
    var angLoops = (2 * Math.PI) / this.loops;

    for (let i = 0; i < this.slices; i++) {
        for (let j = 0; j < this.loops; j++) {
            let x = (this.outer + this.inner * (Math.cos(angLoops) * j)) * (Math.cos(angSlices) * i);
            let y = (this.outer + this.inner * (Math.cos(angLoops) * j)) * (Math.cos(angSlices) * i);
            let z = this.inner * (Math.sin(angSlices) * i);
            this.vertices.push(x, y, z);
            this.normals.push(x, y, z);
        }
    }

    for (i = 0; i < this.slices; i++) {
        for (j = 0; j < this.loops - 1; j++) {
            this.indices.push(i * this.slices + j, i * this.slices + j + 1, (i + 1) * this.slices + j);
            this.indices.push(i * this.slices + j + 1, (i + 1) * this.slices + j + 1, (i + 1) * this.slices + j);
        }

        this.indices.push(i * this.slices + this.slices - 1, i * this.slices, (i + 1) * this.slices + this.slices - 1);
        this.indices.push(i * this.slices, i * this.slices + this.slices, (i + 1) * this.slices + this.slices - 1);
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};
