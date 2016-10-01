function Rectangle(scene, x1, y1, x2, y2) {
    CGFobject.call(this, scene);

    if (typeof x1 == 'undefined') {
        this.x1 = 0.5;
    } else {
        this.x1 = x1;
    }

    if (typeof y1 == 'undefined') {
        this.y1 = 0.5;
    } else {
        this.y1 = y1;
    }

    if (typeof x2 == 'undefined') {
        this.x2 = -0.5;
    } else {
        this.x2 = x2;
    }

    if (typeof y2 == 'undefined') {
        this.y2 = -0.5;
    } else {
        this.y2 = y2;
    }

    console.log("x1 : " + x1);
    console.log("y1 : " + y1);
    console.log("x2 : " + x2);
    console.log("y2 : " + y2);

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
        this.x2, this.y2, 0,
        this.x2, this.y1, 0,
        this.x1, this.y2, 0,
        this.x1, this.y1, 0
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
