/**
 * Rectangle
 * @param scene CGFscene where the Rectangle will be displayed
 * @param x1 x of the first point
 * @param y1 y of the first point
 * @param x2 x of the second point
 * @param y2 y of the second point
 * @constructor
 */
function Rectangle(scene, x1, y1, x2, y2) {
    CGFobject.call(this, scene);

    this.values = {};
    this.values['x1'] = x1;
    this.values['y1'] = y1;
    this.values['x2'] = x2;
    this.values['y2'] = y2;
    this.minS = 0;
    this.maxS = 1;
    this.minT = 0;
    this.maxT = 1;

    this.initBuffers();
};

Rectangle.prototype = Object.create(CGFobject.prototype);
Rectangle.prototype.constructor = Rectangle;

/**
 * Initializes the Rectangle buffers (vertices, indices, normals and texCoords)
 */
Rectangle.prototype.initBuffers = function() {

    this.vertices = [
        this.values['x2'], this.values['y2'], 0,
        this.values['x2'], this.values['y1'], 0,
        this.values['x1'], this.values['y2'], 0,
        this.values['x1'], this.values['y1'], 0
    ]

    this.indices = [
        0, 1, 2,
        2, 1, 3
    ];

    this.normals = [
        this.values['x2'], this.values['y2'], 0,
        this.values['x2'], this.values['y1'], 0,
        this.values['x1'], this.values['y2'], 0,
        this.values['x1'], this.values['y1'], 0

    ];

    this.originalTexCoords = [
        this.maxS, this.maxT,
        this.maxS, this.minT,
        this.minS, this.maxT,
        this.minS, this.minT
    ];

    this.texCoords = this.originalTexCoords.slice();

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};

/**
 * Updates the Rectangle amplification factors
 * @param s s domain amplification factor
 * @param t t domain amplification factor
 */
Rectangle.prototype.updateTexCoords = function(s, t) {

  for (var i = 0; i < this.texCoords.length; i += 2) {
      this.texCoords[i] = this.originalTexCoords[i] / s;
      this.texCoords[i + 1] = this.originalTexCoords[i+1] / t;
    }

    this.updateTexCoordsGLBuffers();
};
