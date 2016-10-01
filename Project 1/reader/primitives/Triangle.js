function Triangle(scene, x1, y1, z1, x2, y2, z2, x3, y3, z3) {
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

    if (typeof z1 == 'undefined') {
        this.z1 = 0.5;
    } else {
        this.z1 = y1;
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

    if (typeof z2 == 'undefined') {
        this.z2 = -0.5;
    } else {
        this.z2 = z2;
    }

    if (typeof x3 == 'undefined') {
        this.x3 = -0.5;
    } else {
        this.x3 = x3;
    }

    if (typeof y3 == 'undefined') {
        this.y3 = -0.5;
    } else {
        this.y3 = y3;
    }

    if (typeof z3 == 'undefined') {
        this.z3 = -0.5;
    } else {
        this.z3 = z3;
    }

    console.log("x1 : " + x1);
    console.log("y1 : " + y1);
    console.log("z1 : " + z1);
    console.log("x2 : " + x2);
    console.log("y2 : " + y2);
    console.log("z2 : " + z2);
    console.log("x3 : " + x3);
    console.log("y3 : " + y3);
    console.log("z3 : " + z3);

    this.v1=[x1,y1,z1];
    this.v2=[x2,y2,z2];
    this.v3=[x3,y3,z3];

    /*
    this.v1=vec3.createFrom(x1, y1, z1);
    this.v2=vec3.createFrom(x2, y2, z2);
    this.v3=vec3.createFrom(x3, y3, z3);
*/
    this.initBuffers();
};

Triangle.prototype = Object.create(CGFobject.prototype);
Triangle.prototype.constructor = Triangle;

Triangle.prototype.initBuffers = function() {

    this.vertices = [
        this.v1[0], this.v1[1], this.v1[2],
        this.v2[0],this.v2[1],this.v2[2],
        this.v3[0],this.v3[1],this.v3[1],
    ]

    this.indices = [
        2, 0, 1,
    ];


    //TODO normals
/*
   this.normals = [
        0, 0, 1,
        0, 0, 1
    ];


    this.texCoords = [
        this.minS, this.maxT,
        this.minS, this.minT,
        this.maxS, this.maxT,
        this.maxS, this.minT
    ];
*/
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};
