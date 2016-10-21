  function Sphere(scene, reader, newElement) {
      CGFobject.call(this, scene);

      this.newElement = newElement;
      this.reader = reader;
      this.sceneGraph = scene;
      this.slices = this.reader.getInteger(this.newElement, 'slices');
      this.stacks = this.reader.getInteger(this.newElement, 'stacks');
      this.radius = this.reader.getFloat(this.newElement, 'radius');

      this.SemiSphere1 = new SemiSphere(this.scene, this.slices, this.stacks, this.radius);
      this.SemiSphere2 = new SemiSphere(this.scene, this.slices, this.stacks, this.radius);
      this.initBuffers();
  };

  Sphere.prototype = Object.create(CGFobject.prototype);
  Sphere.prototype.constructor = Sphere;

  Sphere.prototype.initBuffers = function() {

      this.vertices = [];
      this.normals = [];
      this.indices = [];
      this.texCoords = [];

      var ang_slices = (2 * Math.PI) / this.slices;
      var ang_stacks = Math.PI / this.stacks;

      for (i = 0; i <= this.stacks; i++) {
          for (j = 0; j <= this.slices; j++) {
              let x = this.radius * Math.cos(ang_slices * j) * Math.sin(ang_stacks * i);
              let y = this.radius * Math.sin(ang_slices * j) * Math.sin(ang_stacks * i);
              let z = this.radius * Math.cos(ang_stacks * i);

              this.vertices.push(x, y, z);
              this.normals.push(x, y, z);
              this.texCoords.push(j / this.slices, 1 - i / this.stacks);
          }
      }

      for (i = 0; i < this.stacks; i++) {
          for (j = 0; j < this.slices; j++) {
              this.indices.push(i * (this.slices + 1) + j, (i + 1) * (this.slices + 1) + j, (i + 1) * (this.slices + 1) + j + 1);
              this.indices.push(i * (this.slices + 1) + j, (i + 1) * (this.slices + 1) + j + 1, i * (this.slices + 1) + j + 1);
          }
      }

      this.primitiveType = this.scene.gl.TRIANGLES;
      this.initGLBuffers();
  }
