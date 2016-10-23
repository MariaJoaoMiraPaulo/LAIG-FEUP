/**
 * Triangle
 * @param scene CGFscene where the Triangle will be displayed
 * @param reader CGFXMLreader
 * @param newElement tag Triangle to be read
 * @constructor
 */
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

/**
 * Initializes the Triangle buffers (vertices, indices, normals and texCoords)
 */
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
    this.originalTexCoords = [];
    /*    this.originalTexCoords = [
    		    0.5, 0,
            0,1,
            1,1
        ];*/
    this.calculatingoriginalTexCoords();
    this.texCoords = this.originalTexCoords.slice();
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};

/**
 * Updates the original texCoords
 */
Triangle.prototype.calculatingoriginalTexCoords = function() {
    this.originalTexCoords.push(0, 1);

    var p1p2 = vec3.fromValues(this.values['x2'] - this.values['x1'], this.values['y2'] - this.values['y1'], this.values['z2'] - this.values['z1']);
    var p1p3 = vec3.fromValues(this.values['x3'] - this.values['x1'], this.values['y3'] - this.values['y1'], this.values['z3'] - this.values['z1']);

    var angle = this.angle(p1p2, p1p3);
    var triangleHeight = Math.round(vec3.length(p1p2) * Math.sin(angle) * 100) / 100; // vec3.len
    var triangleWidth = Math.round(vec3.length(p1p3) * 100) / 100;

    if (triangleWidth > triangleHeight) {
        this.originalTexCoords.push(1, 1); // pushing p3

        let newTriangleHeight = triangleHeight / triangleWidth;
        let tCoord = 1 - newTriangleHeight;
        let sCoord = newTriangleHeight / Math.tan(angle);

        this.originalTexCoords.push(tCoord, sCoord); // pushing p2

    } else if (triangleWidth == triangleHeight) {
        this.originalTexCoords.push(0.5, 0);
        this.originalTexCoords.push(1, 1);

    } else if (triangleWidth < triangleHeight) {
        this.originalTexCoords.push(Math.cos(angle), 0); // pushing p2

        var newTriangleWidth = triangleWidth / triangleHeight;

        this.originalTexCoords.push(newTriangleWidth, 1); // pushing p3
    }
};


/**
 * Returns the angle between two vectores
 * @param a vector a
 * @param b vector b
 */
Triangle.prototype.angle = function(a, b) {

    var tempA = vec3.fromValues(a[0], a[1], a[2]);
    var tempB = vec3.fromValues(b[0], b[1], b[2]);

    vec3.normalize(tempA, tempA);
    vec3.normalize(tempB, tempB);

    var cosine = vec3.dot(tempA, tempB);
    if (cosine > 1.0) {
        return 0;
    } else {
        return Math.acos(cosine);
    }
};

/**
 * Updates the Triangle amplification factors
 * @param s s domain amplification factor
 * @param t t domain amplification factor
 */
Triangle.prototype.updateTexCoords = function(s,t) {
  for (var i = 0; i < this.texCoords.length; i += 2) {
      this.texCoords[i] = this.originalTexCoords[i] / s;
      this.texCoords[i + 1] = this.originalTexCoords[i+1] / t;
    }

    this.updateTexCoordsGLBuffers();
}
