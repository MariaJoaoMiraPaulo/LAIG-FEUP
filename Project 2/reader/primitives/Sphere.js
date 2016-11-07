/**
 * Sphere
 * @param scene CGFscene where the Sphere will be displayed
 * @param reader CGFXMLreader
 * @param newElement tag Sphere to be read
 * @constructor
 */
function Sphere(scene, reader, newElement) {
      CGFobject.call(this, scene);

      this.newElement = newElement;
      this.reader = reader;
      this.sceneGraph = scene;
      this.slices = this.reader.getInteger(this.newElement, 'slices');
      this.stacks = this.reader.getInteger(this.newElement, 'stacks');
      this.radius = this.reader.getFloat(this.newElement, 'radius');

      this.initBuffers();
  };

  Sphere.prototype = Object.create(CGFobject.prototype);
  Sphere.prototype.constructor = Sphere;

  /**
   * Initializes the Sphere buffers (vertices, indices, normals and texCoords)
   */
  Sphere.prototype.initBuffers = function() {

      this.vertices = [];
      this.normals = [];
      this.indices = [];
      this.originalTexCoords = [];

      var ang_slices = (2 * Math.PI) / this.slices;
      var ang_stacks = Math.PI / this.stacks;

      for (i = 0; i <= this.stacks; i++) {
          for (j = 0; j <= this.slices; j++) {
              let x = this.radius * Math.cos(ang_slices * j) * Math.sin(ang_stacks * i);
              let y = this.radius * Math.sin(ang_slices * j) * Math.sin(ang_stacks * i);
              let z = this.radius * Math.cos(ang_stacks * i);

              this.vertices.push(x, y, z);
              this.normals.push(x, y, z);
              this.originalTexCoords.push(j / this.slices, 1 - i / this.stacks);
          }
      }

      for (i = 0; i < this.stacks; i++) {
          for (j = 0; j < this.slices; j++) {
              this.indices.push(i * (this.slices + 1) + j, (i + 1) * (this.slices + 1) + j, (i + 1) * (this.slices + 1) + j + 1);
              this.indices.push(i * (this.slices + 1) + j, (i + 1) * (this.slices + 1) + j + 1, i * (this.slices + 1) + j + 1);
          }
      }

      this.texCoords = this.originalTexCoords.slice();

      this.primitiveType = this.scene.gl.TRIANGLES;
      this.initGLBuffers();
  }

  /**
   * Updates the Sphere amplification factors
   * @param s s domain amplification factor
   * @param t t domain amplification factor
   */
  Sphere.prototype.updateTexCoords = function(s,t) {
    for (var i = 0; i < this.texCoords.length; i += 2) {
        this.texCoords[i] = this.originalTexCoords[i] / s;
        this.texCoords[i + 1] = this.originalTexCoords[i+1] / t;
      }

      this.updateTexCoordsGLBuffers();
  };
