/**
 * Plane
 * @param scene CGFscene where the Plane will be displayed
 * @param dimX X dimensions
 * @param dimY Y dimensions
 * @param partsX number of divisions on x axis
 * @param partsY number of divisions on y axis
 * @constructor
 */
function Plane(scene, dimX, dimY, partsX, partsY) {

    this.surface;
    this.func;
    this.minX = dimX/2;
    this.minY = dimY/2;

    this.createSurface(dimX,dimY);
    CGFnurbsObject.call(this, scene, this.func, partsX, partsY);

};

Plane.prototype = Object.create(CGFnurbsObject.prototype);
Plane.prototype.constructor = Plane;

/**
 * Creates the new surface
 */
Plane.prototype.createSurface = function() {

  var degree1 = 1;
  var degree2 = 1;

  var knots1 = this.getKnotsVector(degree1);
  var knots2 = this.getKnotsVector(degree2);
  var controlPoints = [
    [
      [-this.minX,-this.minY,0,1],
      [-this.minX,this.minY,0,1]
    ],
    [
      [this.minX,-this.minY,0,1],
      [this.minX,this.minY,0,1]
    ]
  ];

this.surface = new CGFnurbsSurface(degree1, degree2, knots1, knots2, controlPoints);
this.func = function(u,v){
      return this.surface.getPoint(u,v) ;
   }
};

/**
 * Method to get knots vector
 */
Plane.prototype.getKnotsVector = function(degree) {
	var v = new Array();
	for (var i=0; i<=degree; i++) {
		v.push(0);
	}
	for (var i=0; i<=degree; i++) {
		v.push(1);
	}
	return v;
}


Plane.prototype.updateTexCoords = function(s,t) {
}

/**
 * Method to display the plane
 */
Plane.prototype.display = function() {
  CGFnurbsObject.prototype.display.call(this);
}
