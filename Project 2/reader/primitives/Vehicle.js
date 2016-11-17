function Vehicle(scene, reader) {
    CGFobject.call(this, scene);
    this.scene = scene;
    this.reader = reader;
    var points = [[-1.5, 0, 1, 1], [-2, 1, 0.8, 1], [-2, 1, -0.8, 1], [-1.5, 2, -0.8, 1], [-1.5, 3, -0.8, 1],
        [0, 0, 1, 1], [0, 1, 0.8, 1], [0, 1, -0.8, 1], [0, 2, -0.8, 1], [0, 3, -0.8, 1],
        [1, 0, 1, 1], [1, 1, 0.8, 1], [1, 1, -0.8, 1], [1, 2, -0.8, 1], [1, 3, -0.8, 1],
        [1.5, 0, 1, 1], [2, 1, 0.8, 1], [2, 1, -0.8, 1], [1.5, 2, -0.8, 1], [1.5, 3, -0.8, 1]];

    var points2 = [[1.5, 0, 1, 1], [2, 1, 0.8, 1], [2, 1, -0.8, 1], [1.5, 2, -0.8, 1], [1.5, 3, -0.8, 1],
        [1.5, 0, -1, 1], [1.5, 0.8, -1, 1], [1.5, 1, -1, 1], [1.5, 2, -1, 1], [1.5, 3, -1, 1],
        [1.5, 0, -1, 1], [1.5, 0.8, -1, 1], [1.5, 1, -1, 1], [1.5, 2, -1, 1], [1.5, 3, -1, 1]];

    /*var points3 = [[-1.5, 0, 1, 1], [-2, 1, 0.8, 1], [-2, 1, -0.8, 1], [-1.5, 2, -0.8, 1],
        [-1.5, 0, -1, 1], [-1.5, 0.8, -1, 1], [-1.5, 1, -1, 1], [-1.5, 2, -1, 1],
        [-1.5, 0, -1, 1], [-1.5, 0.8, -1, 1], [-1.5, 1, -1, 1], [-1.5, 2, -1, 1]];*/

    var points3 = [[1.5, 0, -1, 1], [1.5, 0.8, -1, 1], [1.5, 1, -1, 1], [1.5, 2, -1, 1], [1.5, 3, -1, 1],
        [1.5, 0, -1, 1], [1.5, 0.8, -1, 1], [1.5, 1, -1, 1], [1.5, 2, -1, 1], [1.5, 3, -1, 1],
        [1.5, 0, 1, 1], [2, 1, 0.8, 1], [2, 1, -0.8, 1], [1.5, 2, -0.8, 1], [1.5, 3, -0.8, 1]];

    var points4 = [[-1.5, 2, -0.8, 1], [-1.8, 2.2, -2.05, 1], [-1.8, 2.4, -3.3, 1], [-1.8, 2, -4.6, 1], [-1.5, 2, -6, 1],
        [-1.3, 2, -0.8, 1], [-1.3, 2.2, -2.05, 1], [-1.3, 2.4, -3.3, 1], [-1.3, 2, -4.6, 1], [-1.3, 2, -6, 1],
        [1.5, 2, -0.8, 1], [1.5, 2.2, -2.05, 1], [1.5, 2.4, -3.3, 1], [1.5, 2, -4.6, 1], [1.5, 2, -6, 1]];

    var points5 = [[1.5, 2, -0.8, 1], [1.5, 2.2, -2.05, 1], [1.5, 2.4, -3.3, 1], [1.5, 2, -4.6, 1], [1.5, 2, -6, 1],
        [1.5, 2, -0.8, 1], [1.5, 2, -2.05, 1], [1.5, 2, -3.3, 1], [1.5, 2, -4.6, 1], [1.5, 2, -6, 1]];

    var points6 = [[1.5, 0.25, -0.9, 1], [1.5, 0.5, -1, 1], [1.5, 0.75, -1.25, 1], [1.5, 1, -1.5, 1], [1.5, 0.75, -1.75, 1], [1.5, 0.5, -2, 1], [1.5, 0.25, -2.1, 1],
        [1.75, 0.25, -0.9, 1], [1.75, 0.5, -1, 1], [1.75, 0.95, -1.25, 1], [1.75, 1.2, -1.5, 1], [1.75, 0.95, -1.75, 1], [1.75, 0.5, -2, 1], [1.75, 0.25, -2.1, 1],
        [2, 0.25, -0.9, 1], [2, 0.45, -1, 1], [2, 0.7, -1.25, 1], [2, 0.95, -1.5, 1], [2, 0.7, -1.75, 1], [2, 0.45, -2, 1], [2, 0.25, -2.1, 1],
        [2, 0.25, -0.9, 1], [2, 0.3, -1, 1], [2, 0.55, -1.25, 1], [2, 0.8, -1.5, 1], [2, 0.55, -1.75, 1], [2, 0.3, -2, 1], [2, 0.25, -2.1, 1]
    ];


    this.front = new Patch(this.scene, 3, 4, 20, 20, points);
    this.doorLeft = new Patch(this.scene, 2, 4, 20, 20, points2);
    this.doorRight = new Patch(this.scene, 2, 4, 20, 20, points3);
    this.rect = new Rectangle(this.scene, 0.5, 0.5, -0.5, -0.5);
    this.ceiling = new Patch(this.scene, 2, 4, 20, 20, points4);
    this.fixCeiling = new Patch(this.scene, 1, 4, 20, 20, points5);
    this.whellTop = new Patch(this.scene, 3, 6, 20, 20, points6);
    this.wheel = new Cylinder(this.scene, 0.5, 0.5, 0.4, 50, 50);


};

Vehicle.prototype = Object.create(CGFobject.prototype);
Vehicle.prototype.constructor = Vehicle;

/**
 * Adds the base and the top of the Vehicle. Updates Vehicle's height
 */
Vehicle.prototype.display = function () {

    this.scene.pushMatrix();
    this.front.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.doorLeft.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(1.5, 1, -3.5);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
    this.scene.scale(5, 2, 2);
    this.rect.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-1.5, 1, -3.5);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.scene.scale(5, 2, 2);
    this.rect.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-3,0,0);
	this.doorRight.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.ceiling.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.fixCeiling.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0,0,0.25);
    this.whellTop.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(1.5, 0.2, -1.25);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.wheel.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0,0,-2.5);
    this.whellTop.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(1.5, 0.2, -4);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.wheel.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0, -5.5);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.whellTop.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-1.5, 0.2, -4);
    this.scene.rotate(3*Math.PI / 2, 0, 1, 0);
    this.wheel.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0, -2.75);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.whellTop.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-1.5, 0.2, -1.25);
    this.scene.rotate(3*Math.PI / 2, 0, 1, 0);
    this.wheel.display();
    this.scene.popMatrix();
}

Vehicle.prototype.updateTexCoords = function (s, t) {
    this.front.updateTexCoords(s, t);
}
