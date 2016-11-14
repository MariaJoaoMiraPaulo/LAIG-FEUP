function Vehicle(scene, reader, newElement) {
    CGFobject.call(this, scene);
    this.scene = scene;
    this.reader = reader;
    this.newElement = newElement;

    this.initBuffers();
};

Vehicle.prototype = Object.create(CGFobject.prototype);
Vehicle.prototype.constructor = Vehicle;

/**
 * Initializes the Vehicle buffers (vertices, indices, normals and texCoords)
 */
Vehicle.prototype.initBuffers = function() {
};

/**
 * Updates the Vehicle amplification factors
 * @param s s domain amplification factor
 * @param t t domain amplification factor
 */
Vehicle.prototype.updateTexCoords = function(s,t) {

};
