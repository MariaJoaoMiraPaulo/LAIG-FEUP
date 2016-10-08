  function SemiSphere(scene, slices, stacks, radius) {
 	CGFobject.call(this,scene);

	this.slices = slices;
  this.radius = radius;
	this.stacks = stacks;

	this.base = new Circle(this.scene,this.radius);
 	this.initBuffers();
 };

 SemiSphere.prototype = Object.create(CGFobject.prototype);
 SemiSphere.prototype.constructor = SemiSphere;

 SemiSphere.prototype.initBuffers = function() {

 	this.vertices = [];
 	this.normals = [];
 	this.indices = [];
 	this.texCoords = [];

	var ang1=(2*Math.PI)/this.slices; // 0-360 deg
	var ang2=(Math.PI)/this.slices; // 0-180 deg
	var n_verts = 0;


	for(var i=0;i<this.slices;i++){
		for(var j = 0; j < this.slices/2; j++){

			//vertices
			this.vertices.push(Math.cos(ang1*i)*Math.sin(ang2*j), Math.sin(ang1*i)*Math.sin(ang2*j)
			, Math.cos(ang2*j));
			n_verts++;

			this.vertices.push(Math.cos(ang1*(i+1))*Math.sin(ang2*j), Math.sin(ang1*(i+1))*Math.sin(ang2*j)
			, Math.cos(ang2*j));
			n_verts++;

			this.vertices.push(Math.cos(ang1*i)*Math.sin(ang2*(j+1)), Math.sin(ang1*i)*Math.sin(ang2*(j+1))
			, Math.cos(ang2*(j+1)));
			n_verts++;

			this.vertices.push(Math.cos(ang1*(i+1))*Math.sin(ang2*(j+1)), Math.sin(ang1*(i+1))*Math.sin(ang2*(j+1))
			, Math.cos(ang2*(j+1)));
			n_verts++;


			//indices
			this.indices.push(n_verts - 2, n_verts - 3, n_verts-4);
			this.indices.push(n_verts - 2, n_verts - 1, n_verts-3);


			//normals
			this.normals.push(Math.cos(ang1*i)*Math.sin(ang2*j), Math.sin(ang1*i)*Math.sin(ang2*j)
			, Math.cos(ang2*j));

			this.normals.push(Math.cos(ang1*(i+1))*Math.sin(ang2*j), Math.sin(ang1*(i+1))*Math.sin(ang2*j)
			, Math.cos(ang2*j));


			this.normals.push(Math.cos(ang1*i)*Math.sin(ang2*(j+1)), Math.sin(ang1*i)*Math.sin(ang2*(j+1))
			, Math.cos(ang2*(j+1)));


			this.normals.push(Math.cos(ang1*(i+1))*Math.sin(ang2*(j+1)), Math.sin(ang1*(i+1))*Math.sin(ang2*(j+1))
			, Math.cos(ang2*(j+1)));



			//texCoords
			this.texCoords.push(0.5*Math.cos(ang1*i)*Math.sin(ang2*j) + 0.5, 0.5 - 0.5*Math.sin(ang1*i)*Math.sin(ang2*j));
			this.texCoords.push(0.5*Math.cos(ang1*(i+1))*Math.sin(ang2*j) + 0.5, 0.5 - 0.5*Math.sin(ang1*(i+1))*Math.sin(ang2*j));
			this.texCoords.push(0.5*Math.cos(ang1*i)*Math.sin(ang2*(j+1)) + 0.5, 0.5 - 0.5*Math.sin(ang1*i)*Math.sin(ang2*(j+1)));
			this.texCoords.push(0.5*Math.cos(ang1*(i+1))*Math.sin(ang2*(j+1))+0.5 ,0.5 - 0.5*Math.sin(ang1*(i+1))*Math.sin(ang2*(j+1)));


		}

	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
