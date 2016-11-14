function Plane(scene, reader, newElement) {
    CGFobject.call(this, scene);
    this.scene = scene;
    this.reader = reader;
    this.newElement = newElement;

    this.initBuffers();
};

Plane.prototype = Object.create(CGFobject.prototype);
Plane.prototype.constructor = Plane;

/**
 * Initializes the Plane buffers (vertices, indices, normals and texCoords)
 */
Plane.prototype.initBuffers = function() {
};

/**
 * Updates the Plane amplification factors
 * @param s s domain amplification factor
 * @param t t domain amplification factor
 */
Plane.prototype.updateTexCoords = function(s,t) {

};
