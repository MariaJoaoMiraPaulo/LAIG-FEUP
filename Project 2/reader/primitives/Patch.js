function Patch(scene, orderU, orderV, partsU, partsV,points) {
  this.scene=scene;
    var knots1 = this.getKnotsVector(orderU);
    var knots2 = this.getKnotsVector(orderV);

    this.controlPoints = this.getPoints(points,orderU,orderV);
    console.log(this.controlPoints);
    surface = new CGFnurbsSurface(orderU, orderV, knots1, knots2, this.controlPoints);
    this.func = function(u,v){
          return surface.getPoint(u,v) ;
       }

    CGFnurbsObject.call(this, scene, this.func, partsU, partsV);

};

Patch.prototype = Object.create(CGFnurbsObject.prototype);
Patch.prototype.constructor = Patch;

Patch.prototype.getPoints = function(points,orderU,orderV){

var controlPoints = [];
    var indice=0;
    for(i=0;i<=orderU;i++){
      var group =[];
      for(j=0;j<=orderV;j++){
        group.push(points[indice]);
        indice++;
      }
      controlPoints.push(group);
    }
    return controlPoints;
}

Patch.prototype.getKnotsVector = function(degree) {
	var v = new Array();
	for (var i=0; i<=degree; i++) {
		v.push(0);
	}
	for (var i=0; i<=degree; i++) {
		v.push(1);
	}
	return v;
}

Patch.prototype.updateTexCoords = function(s,t) {
}

Patch.prototype.display = function() {
  this.scene.pushMatrix();
  CGFnurbsObject.prototype.display.call(this);
  this.scene.popMatrix();
}
