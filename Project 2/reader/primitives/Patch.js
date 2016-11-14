function Patch(scene, reader, newElement) {
    CGFobject.call(this, scene);
    this.scene = scene;
    this.reader = reader;
    this.newElement = newElement;

    this.initBuffers();
};

Patch.prototype = Object.create(CGFobject.prototype);
Patch.prototype.constructor = Patch;

/**
 * Initializes the Patch buffers (vertices, indices, normals and texCoords)
 */
Patch.prototype.initBuffers = function() {
};

/**
 * Updates the Patch amplification factors
 * @param s s domain amplification factor
 * @param t t domain amplification factor
 */
Patch.prototype.updateTexCoords = function(s,t) {

};
