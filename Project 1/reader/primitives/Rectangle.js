function Rectangle(scene, reader, newElement) {
    CGFobject.call(this, scene);

    this.reader = reader;
    this.newElement = newElement;
    this.values = {};
    this.values['x1'] = this.reader.getFloat(this.newElement, 'x1');
    this.values['y1'] = this.reader.getFloat(this.newElement, 'y1');
    this.values['x2'] = this.reader.getFloat(this.newElement, 'x2');
    this.values['y2'] = this.reader.getFloat(this.newElement, 'y2');
    this.minS = 0;
    this.maxS = 1;
    this.minT = 0;
    this.maxT = 1;

    this.initBuffers();
};

Rectangle.prototype = Object.create(CGFobject.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.initBuffers = function() {

    this.vertices = [
        this.values['x2'], this.values['y2'], 0,
        this.values['x2'], this.values['y1'], 0,
        this.values['x1'], this.values['y2'], 0,
        this.values['x1'], this.values['y1'], 0
    ]

    this.indices = [
        2, 1, 0,
        3, 1, 2
    ];

    this.normals = [
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1

    ];

    this.texCoords = [
        this.minS, this.maxT,
        this.minS, this.minT,
        this.maxS, this.maxT,
        this.maxS, this.minT
    ];

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};
