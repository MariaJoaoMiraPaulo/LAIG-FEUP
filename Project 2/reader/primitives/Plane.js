/**
 * Plane
 * @constructor
 */
class Plane {//extends CGFnurbsObject {
    constructor(scene, dimX, dimY, partsX, partsY) {
        //super(scene, getSurfacePoint, partsX, partsY);

      /*  getSurfacePoint = function(u, v) {
          //  return nurbsSurface.getPoint(u, v);
        };*/

        this.controlPoints = [];

        this.createControlPoints();
    }

    createControlPoints() {

        let patchY = -this.dimY / 2;
        let lengthY = this.dimY / this.partsY;
        let patchX = -this.dimX / 2;
        let lengthX = this.dimX / this.partsX;

        for (let x = 0; x < this.partsX; x++) {
            let temp = [];
            patchX += lengthX;
            for (let y = 0; y < this.partsY; y++) {
                temp.push(patchX, patchY, 0, 1);
                patchY += lengthY;
            }

            patchY = -this.dimY / 2;
            this.controlPoints.push(temp);
        }

    }

    makeSurface() { //(id, degree1, degree2, controlvertexes, translation)

        /*    var knots1 = this.getKnotsVector(degree1); // to be built inside webCGF in later versions ()
            var knots2 = this.getKnotsVector(degree2); // to be built inside webCGF in later versions

            var nurbsSurface = new CGFnurbsSurface(degree1, degree2, knots1, knots2, controlvertexes); // TODO  (CGF 0.19.3): remove knots1 and knots2 from CGFnurbsSurface method call. Calculate inside method.
            getSurfacePoint = function(u, v) {
                return nurbsSurface.getPoint(u, v);
            };

            var obj = new CGFnurbsObject(this, getSurfacePoint, 20, 20);
            this.surfaces.push(obj);*/
    }
}
