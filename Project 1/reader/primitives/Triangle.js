function Triangle(scene, reader, newElement) {
    CGFobject.call(this, scene);
    this.reader = reader;
    this.newElement = newElement;
    this.values = {};

    this.values['x1'] = this.reader.getFloat(newElement, 'x1');
    this.values['y1'] = this.reader.getFloat(newElement, 'y1');
    this.values['z1'] = this.reader.getFloat(newElement, 'z1');
    this.values['x2'] = this.reader.getFloat(newElement, 'x2');
    this.values['y2'] = this.reader.getFloat(newElement, 'y2');
    this.values['z2'] = this.reader.getFloat(newElement, 'z2');
    this.values['x3'] = this.reader.getFloat(newElement, 'x3');
    this.values['y3'] = this.reader.getFloat(newElement, 'y3');
    this.values['z3'] = this.reader.getFloat(newElement, 'z3');

    this.initBuffers();
};

Triangle.prototype = Object.create(CGFobject.prototype);
Triangle.prototype.constructor = Triangle;

Triangle.prototype.initBuffers = function() {

    this.vertices = [
        this.values['x1'], this.values['y1'], this.values['z1'],
        this.values['x2'], this.values['y2'], this.values['z2'],
        this.values['x3'], this.values['y3'], this.values['z3']
    ]

    this.indices = [
        2, 0, 1,
        2, 1, 0
    ];


    this.normals = [
      this.values['x1'], this.values['y1'], this.values['z1'],
      this.values['x2'], this.values['y2'], this.values['z2'],
      this.values['x3'], this.values['y3'], this.values['z3']
    ];

    this.texCoords = [
		    0.5, 0.5,
        1,0,
        0,1
    ];

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};
