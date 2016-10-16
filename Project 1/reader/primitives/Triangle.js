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

    this.minS = 0;
    this.minT = 0;
    this.maxS = 1;
    this.maxT = 1;

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

    var ab = Math.sqrt(Math.pow(this.v2x-this.v1x, 2) + Math.pow(this.v2y-this.v1y, 2) + Math.pow(this.v2z-this.v1z, 2));
    var bc = Math.sqrt(Math.pow(this.v2x-this.v3x, 2) + Math.pow(this.v2y-this.v3y, 2) + Math.pow(this.v2z-this.v3z, 2));
    var ac = Math.sqrt(Math.pow(this.v1x-this.v3x, 2) + Math.pow(this.v1y-this.v3y, 2) + Math.pow(this.v1z-this.v3z, 2));
    var beta = Math.acos((Math.pow(bc, 2) + Math.pow(ab, 2) - Math.pow(ac, 2))/(2*ab*bc));

    this.texCoords = [
		this.minS, this.minT,
		this.maxS, this.minT,
		(ab - bc*Math.cos(beta))/ab, bc*Math.sin(beta)/ab
    ];

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};
