function Torus(scene, reader, newElement) {
    CGFobject.call(this, scene);

    this.reader = reader;
    this.newElement = newElement;

    this.inner = this.reader.getFloat(this.newElement, 'inner');
    this.outer = this.reader.getFloat(this.newElement, 'outer');
    this.slices = this.reader.getInteger(this.newElement, 'slices');
    this.loops = this.reader.getInteger(this.newElement, 'loops');

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

    for (let i = 0; i <= this.slices; i++) {
        for (let j = 0; j <= this.loops; j++) {
            let u = angSlices * i;
            let v = angLoops * j;

            let x = (this.outer + this.inner * Math.cos(v)) * Math.cos(u);
            let y = (this.outer + this.inner * Math.cos(v)) * Math.sin(u);
            let z = this.inner * Math.sin(v);

            this.vertices.push(x, y, z);
            this.normals.push(x, y, z);
        }

    }

    for (let i = 0; i < this.slices; i++) {
        for (let j = 0; j < this.loops; j++) {

                this.indices.push(j * (this.slices + 1) + i, j * (this.slices + 1) + i + this.slices + 2, j * (this.slices + 1) + i + this.slices + 1);
                this.indices.push(j * (this.slices + 1) + i, j * (this.slices + 1) + i + 1, j * (this.slices + 1) + i + this.slices + 2);
      //      this.indices.push(i * this.loops + j, i * this.loops + j + 1,(i + 1) * this.slices + j + 1);
    //        this.indices.push(i * this.loops + j, (i + 1) * this.slices + j + 1,(i + 1) * this.slices + j);
        }
    }
/*
    let len = this.slices-1
    for (let j = 0; j < this.loops; j++) {
        this.indices.push(j, len * this.slices + j + 1, j+1);
        this.indices.push(j, len * this.slices + j, len * this.slices + j + 1);
    }*/

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};
